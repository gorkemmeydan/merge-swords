/* eslint-disable */
import { getInventory } from "../inventory/inventory.actions";
import store from "../store";
import BattleActionTypes from "./battle.types";

export const setBattleLogActive = (payload) => {
  return {
    type: BattleActionTypes.SET_BATTLE_LOG_ACTIVE,
    payload: payload,
  };
};

export const setBattleLog = (payload) => {
  return {
    type: BattleActionTypes.SET_BATTLE_LOG,
    payload: payload,
  };
};

export const clearBattleLog = () => {
  return {
    type: BattleActionTypes.CLEAR_BATTLE_LOG,
  };
};

export const setSword = (payload) => {
  return {
    type: BattleActionTypes.SET_SWORD,
    payload: payload,
  };
};

const battleRequest = () => {
  return {
    type: BattleActionTypes.BATTLE_REQUEST,
  };
};

const battleSuccess = () => {
  return {
    type: BattleActionTypes.BATTLE_SUCCESS,
  };
};

const battleFailed = (payload) => {
  return {
    type: BattleActionTypes.BATTLE_FAILED,
    payload: payload,
  };
};

export const startBattle = () => {
  return async (dispatch) => {
    dispatch(battleRequest());
    const blockchain = store.getState().blockchain;
    const battle = store.getState().battle;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          if (battle.selected) {
            try {
              await blockchain.mergeSwordsToken.methods
                // blockchain.web3.utils.toBN(battle.selected.id)
                .battleMonster(battle.selected.id)
                .send({ from: blockchain.account, value: blockchain.web3.utils.toWei("0.001", "ether") })
                .once("error", (e) => {
                  dispatch(battleFailed(e));
                })
                .then((receipt) => {
                  if (receipt.events.WonBattle) {
                    dispatch(setBattleLogActive(true));
                    const payload = receipt.events.WonBattle.returnValues.attackLog;
                    dispatch(setBattleLog(payload));
                  }
                  if (receipt.events.LostBattle) {
                    dispatch(setBattleLogActive(true));
                    const payload = receipt.events.LostBattle.returnValues.attackLog;
                    dispatch(setBattleLog(payload));
                  }
                });
              dispatch(battleSuccess());
              dispatch(getInventory());
              dispatch(setSword(undefined)); // clear the sword
            } catch (e) {
              dispatch(battleFailed(e));
            }
          } else {
            dispatch(battleFailed("Must select sword to battle"));
          }
        } else {
          dispatch(battleFailed("Token object does not exist"));
        }
      } else {
        dispatch(battleFailed("web3 object does not exist"));
      }
    } else {
      dispatch(battleFailed("Account does not exist"));
    }
  };
};
