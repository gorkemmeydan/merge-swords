import BlockchainActionTypes from "./blockchain.types";

const initialState = {
  loading: false,
  account: null,
  mergeSwordsToken: null,
  web3: null,
  balance: 0,
  errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case BlockchainActionTypes.CONNECTION_REQUEST:
    case BlockchainActionTypes.BALANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BlockchainActionTypes.CONNECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        mergeSwordsToken: action.payload.mergeSwordsToken,
        web3: action.payload.web3,
        errorMsg: "",
      };
    case BlockchainActionTypes.UPDATE_ACCOUNT:
      return {
        ...state,
        account: action.payload.account,
      };
    case BlockchainActionTypes.BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        balance: action.payload.balance,
        errorMsg: "",
      };
    case BlockchainActionTypes.CONNECTION_FAILED:
    case BlockchainActionTypes.BALANCE_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
