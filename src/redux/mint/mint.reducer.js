import MintActionTypes from "./mint.types";

const initialState = {
  loading: false,
  errorMsg: "",
};

const mintReducer = (state = initialState, action) => {
  switch (action.type) {
    case MintActionTypes.MINT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MintActionTypes.MINT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case MintActionTypes.MINT_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

export default mintReducer;
