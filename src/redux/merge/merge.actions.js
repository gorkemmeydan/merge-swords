/* eslint-disable */
import { getInventory } from "../inventory/inventory.actions";
import store from "../store";
import MergeActionTypes from "./merge.types";

export const setNewItemActive = (payload) => {
  return {
    type: MergeActionTypes.SET_NEW_ITEM_ACTIVE,
    payload: payload,
  };
};

export const setSword_1 = (payload) => {
  return {
    type: MergeActionTypes.SET_SWORD_1,
    payload: payload,
  };
};

export const setSword_2 = (payload) => {
  return {
    type: MergeActionTypes.SET_SWORD_2,
    payload: payload,
  };
};

const mergeRequest = () => {
  return {
    type: MergeActionTypes.MERGE_REQUEST,
  };
};

const mergeSuccess = () => {
  return {
    type: MergeActionTypes.MERGE_SUCCESS,
  };
};

const mergeFailed = (payload) => {
  return {
    type: MergeActionTypes.MERGE_FAILED,
    payload: payload,
  };
};

export const mergeSwords = () => {
  return async (dispatch) => {
    dispatch(mergeRequest());
    const blockchain = store.getState().blockchain;
    const merge = store.getState().merge;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          if (merge.selected_1 && merge.selected_2) {
            try {
              await blockchain.mergeSwordsToken.methods
                .mergeSwords(merge.selected_1.id, merge.selected_2.id)
                .send({ from: blockchain.account, value: blockchain.web3.utils.toWei("0.005", "ether") })
                .once("error", (e) => {
                  dispatch(mergeFailed(e));
                })
                .then(() => {
                  dispatch(setNewItemActive(true));
                });
              dispatch(mergeSuccess());
              dispatch(getInventory());
              dispatch(setSword_1(undefined)); // clear the sword
              dispatch(setSword_2(undefined)); // clear the sword
            } catch (e) {
              dispatch(mergeFailed(e));
            }
          } else {
            dispatch(mergeFailed("Must select sword to battle"));
          }
        } else {
          dispatch(mergeFailed("Token object does not exist"));
        }
      } else {
        dispatch(mergeFailed("web3 object does not exist"));
      }
    } else {
      dispatch(mergeFailed("Account does not exist"));
    }
  };
};
