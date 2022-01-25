import InventoryActionTypes from "./inventory.types";

const initialState = {
  loading: false,
  items: [],
  errorMsg: "",
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case InventoryActionTypes.INVENTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case InventoryActionTypes.INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
      };
    case InventoryActionTypes.INVENTORY_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

export default inventoryReducer;
