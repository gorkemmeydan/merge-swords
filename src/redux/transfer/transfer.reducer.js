import TransferActionTypes from "./transfer.types";

const initialState = {
  loading: false,
  errorMsg: "",
  selected: undefined,
};

const transferReducer = (state = initialState, action) => {
  switch (action.type) {
    case TransferActionTypes.SET_SWORD_TRANSFER:
      return {
        ...state,
        selected: action.payload,
      };
    case TransferActionTypes.TRANSFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TransferActionTypes.TRANSFER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case TransferActionTypes.TRANSFER_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

export default transferReducer;
