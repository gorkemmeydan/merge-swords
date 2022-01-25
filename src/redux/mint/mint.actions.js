/* eslint-disable */
import { getInventory } from "../inventory/inventory.actions";
import store from "../store";
import MintActionTypes from "./mint.types";

const mintRequest = () => {
  return {
    type: MintActionTypes.MINT_REQUEST,
  };
};

const mintSuccess = () => {
  return {
    type: MintActionTypes.MINT_SUCCESS,
  };
};

const mintFailed = (payload) => {
  return {
    type: MintActionTypes.MINT_FAILED,
    payload: payload,
  };
};

export const mintNewSword = () => {
  return async (dispatch) => {
    dispatch(mintRequest());
    const blockchain = store.getState().blockchain;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          try {
            await blockchain.mergeSwordsToken.methods
              .getBasicSword()
              .send({ from: blockchain.account, value: blockchain.web3.utils.toWei("0.01", "ether") })
              .once("error", (e) => {
                dispatch(mintFailed(e));
              })
              .then(() => {});
            dispatch(mintSuccess());
            dispatch(getInventory());
          } catch (e) {
            dispatch(mintFailed(e));
          }
        } else {
          dispatch(mintFailed("Token object does not exist"));
        }
      } else {
        dispatch(mintFailed("web3 object does not exist"));
      }
    } else {
      dispatch(mintFailed("Account does not exist"));
    }
  };
};
