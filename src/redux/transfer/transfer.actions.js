/* eslint-disable */
import { getInventory } from "../inventory/inventory.actions";
import store from "../store";
import TransferActionTypes from "./transfer.types";

export const setSwordTransfer = (payload) => {
  return {
    type: TransferActionTypes.SET_SWORD_TRANSFER,
    payload: payload,
  };
};

const transferRequest = () => {
  return {
    type: TransferActionTypes.TRANSFER_REQUEST,
  };
};

const transferSuccess = () => {
  return {
    type: TransferActionTypes.TRANSFER_SUCCESS,
  };
};

const transferFailed = (payload) => {
  return {
    type: TransferActionTypes.TRANSFER_FAILED,
    payload: payload,
  };
};

export const transferSword = (address) => {
  return async (dispatch) => {
    dispatch(transferRequest());
    const blockchain = store.getState().blockchain;
    const transfer = store.getState().transfer;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          if (transfer.selected) {
            try {
              await blockchain.mergeSwordsToken.methods
                .transferToAdress(transfer.selected.id, address)
                .send({ from: blockchain.account })
                .once("error", (e) => {
                  dispatch(transferFailed(e));
                })
                .then(() => {});
              dispatch(transferSuccess());
              dispatch(getInventory());
              dispatch(setSwordTransfer(undefined)); // clear the sword
            } catch (e) {
              dispatch(transferFailed(e));
            }
          } else {
            dispatch(transferFailed("Must select sword to battle"));
          }
        } else {
          dispatch(transferFailed("Token object does not exist"));
        }
      } else {
        dispatch(transferFailed("web3 object does not exist"));
      }
    } else {
      dispatch(transferFailed("Account does not exist"));
    }
  };
};
