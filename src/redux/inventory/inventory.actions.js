/* eslint-disable */
import store from "../store";
import InventoryActionTypes from "./inventory.types";
import convertItemsToGameFormat from "./inventory.utils";

const inventoryRequest = () => {
  return {
    type: InventoryActionTypes.INVENTORY_REQUEST,
  };
};

const inventorySuccess = (payload) => {
  return {
    type: InventoryActionTypes.INVENTORY_SUCCESS,
    payload: payload,
  };
};

const inventoryFailed = (payload) => {
  return {
    type: InventoryActionTypes.INVENTORY_FAILED,
    payload: payload,
  };
};

export const getInventory = () => {
  return async (dispatch) => {
    dispatch(inventoryRequest());
    const blockchain = store.getState().blockchain;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          try {
            const userInventory = await blockchain.mergeSwordsToken.methods.getUserSwords(blockchain.account).call();
            dispatch(inventorySuccess({ items: convertItemsToGameFormat(userInventory) }));

            // set event listener for new sword
            if (window.ethereum) {
              window.ethereum.on("NewSword", () => {
                dispatch(getInventory());
              });
            }
          } catch (e) {
            dispatch(inventoryFailed(e));
          }
        } else {
          dispatch(inventoryFailed("Token object does not exist"));
        }
      } else {
        dispatch(inventoryFailed("web3 object does not exist"));
      }
    } else {
      dispatch(inventoryFailed("Account does not exist"));
    }
  };
};
