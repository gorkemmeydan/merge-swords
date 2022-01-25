import BattleActionTypes from "./battle.types";

const initialState = {
  loading: false,
  errorMsg: "",
  selected: undefined,
  isAttackLogActive: false,
  attackLog: undefined,
};

const battleReducer = (state = initialState, action) => {
  switch (action.type) {
    case BattleActionTypes.SET_BATTLE_LOG_ACTIVE:
      return {
        ...state,
        isAttackLogActive: action.payload,
      };
    case BattleActionTypes.SET_BATTLE_LOG:
      return {
        ...state,
        attackLog: action.payload,
      };
    case BattleActionTypes.CLEAR_BATTLE_LOG:
      return {
        ...state,
        isAttackLogActive: false,
        attackLog: undefined,
      };
    case BattleActionTypes.SET_SWORD:
      return {
        ...state,
        selected: action.payload,
      };
    case BattleActionTypes.BATTLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BattleActionTypes.BATTLE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case BattleActionTypes.BATTLE_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

export default battleReducer;
