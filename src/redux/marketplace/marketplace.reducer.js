import MarketplaceActionTypes from "./marketplace.types";

const initialState = {
  selected_sword: undefined,
  loading: false,
  marketItems: [],
  listedItems: [],
  purchasedItems: [],
  errorMsg: "",
};

const marketplaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case MarketplaceActionTypes.SET_SWORD_MARKETPLACE:
      return {
        ...state,
        selected_sword: action.payload,
      };
    case MarketplaceActionTypes.FETCH_LISTED_REQUEST:
    case MarketplaceActionTypes.FETCH_PURCHASED_REQUEST:
    case MarketplaceActionTypes.FETCH_MARKET_REQUEST:
    case MarketplaceActionTypes.PURCHASE_ITEM_REQUEST:
    case MarketplaceActionTypes.WITHDRAW_ITEM_REQUEST:
    case MarketplaceActionTypes.LIST_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MarketplaceActionTypes.FETCH_LISTED_SUCCESS:
      return {
        ...state,
        loading: false,
        listedItems: action.payload,
      };
    case MarketplaceActionTypes.FETCH_MARKET_SUCCESS:
      return {
        ...state,
        loading: false,
        marketItems: action.payload,
      };
    case MarketplaceActionTypes.FETCH_PURCHASED_SUCCESS:
      return {
        ...state,
        loading: false,
        purchasedItems: action.payload,
      };
    case MarketplaceActionTypes.PURCHASE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case MarketplaceActionTypes.WITHDRAW_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case MarketplaceActionTypes.LIST_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case MarketplaceActionTypes.FETCH_LISTED_FAILED:
    case MarketplaceActionTypes.FETCH_PURCHASED_FAILED:
    case MarketplaceActionTypes.FETCH_MARKET_FAILED:
    case MarketplaceActionTypes.PURCHASE_ITEM_FAILED:
    case MarketplaceActionTypes.WITHDRAW_ITEM_FAILED:
    case MarketplaceActionTypes.LIST_ITEM_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

export default marketplaceReducer;
