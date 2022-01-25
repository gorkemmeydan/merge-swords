import TrashActionTypes from "./trash.types";

const initialState = {
  loading: false,
  errorMsg: "",
  selected: undefined,
};

const trashReducer = (state = initialState, action) => {
  switch (action.type) {
    case TrashActionTypes.SET_SWORD_TRASH:
      return {
        ...state,
        selected: action.payload,
      };
    case TrashActionTypes.TRASH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TrashActionTypes.TRASH_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case TrashActionTypes.TRASH_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

export default trashReducer;
