/* eslint-disable */
import { getInventory } from "../inventory/inventory.actions";
import store from "../store";
import TrashActionTypes from "./trash.types";

export const setSwordTrash = (payload) => {
  return {
    type: TrashActionTypes.SET_SWORD_TRASH,
    payload: payload,
  };
};

const trashRequest = () => {
  return {
    type: TrashActionTypes.TRASH_REQUEST,
  };
};

const trashSuccess = () => {
  return {
    type: TrashActionTypes.TRASH_SUCCESS,
  };
};

const trashFailed = (payload) => {
  return {
    type: TrashActionTypes.TRASH_FAILED,
    payload: payload,
  };
};

export const sendSwordToTrash = () => {
  return async (dispatch) => {
    dispatch(trashRequest());
    const blockchain = store.getState().blockchain;
    const trash = store.getState().trash;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          if (trash.selected) {
            try {
              await blockchain.mergeSwordsToken.methods
                .sendSwordToTrash(trash.selected.id)
                .send({ from: blockchain.account })
                .once("error", (e) => {
                  dispatch(trashFailed(e));
                })
                .then(() => {});
              dispatch(trashSuccess());
              dispatch(getInventory());
              dispatch(setSwordTrash(undefined)); // clear the sword
            } catch (e) {
              dispatch(trashFailed(e));
            }
          } else {
            dispatch(trashFailed("Must select sword to battle"));
          }
        } else {
          dispatch(trashFailed("Token object does not exist"));
        }
      } else {
        dispatch(trashFailed("web3 object does not exist"));
      }
    } else {
      dispatch(trashFailed("Account does not exist"));
    }
  };
};
