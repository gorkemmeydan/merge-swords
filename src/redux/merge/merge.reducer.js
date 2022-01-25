import MergeActionTypes from "./merge.types";

const initialState = {
  loading: false,
  errorMsg: "",
  selected_1: undefined,
  selected_2: undefined,
  isNewItem: false,
};

const mergeReducer = (state = initialState, action) => {
  switch (action.type) {
    case MergeActionTypes.SET_NEW_ITEM_ACTIVE:
      return {
        ...state,
        isNewItem: action.payload,
      };
    case MergeActionTypes.SET_SWORD_1:
      return {
        ...state,
        selected_1: action.payload,
      };
    case MergeActionTypes.SET_SWORD_2:
      return {
        ...state,
        selected_2: action.payload,
      };
    case MergeActionTypes.MERGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MergeActionTypes.MERGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case MergeActionTypes.MERGE_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

export default mergeReducer;
