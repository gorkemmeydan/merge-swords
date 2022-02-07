/* eslint-disable */
import { getInventory } from "../inventory/inventory.actions";
import store from "../store";
import MarketplaceActionTypes from "./marketplace.types";
import convertItemsToMarketFormat from "./marketplace.utils";

export const setSwordMarketplace = (payload) => {
  return {
    type: MarketplaceActionTypes.SET_SWORD_MARKETPLACE,
    payload: payload,
  };
};

const fetchListedRequest = () => {
  return {
    type: MarketplaceActionTypes.FETCH_LISTED_REQUEST,
  };
};

const fetchListedSuccess = (payload) => {
  return {
    type: MarketplaceActionTypes.FETCH_LISTED_SUCCESS,
    payload: payload,
  };
};

const fetchListedFailed = (payload) => {
  return {
    type: MarketplaceActionTypes.FETCH_MARKET_FAILED,
    payload: payload,
  };
};

const fetchPurchasedRequest = () => {
  return {
    type: MarketplaceActionTypes.FETCH_PURCHASED_REQUEST,
  };
};

const fetchPurchasedSuccess = (payload) => {
  return {
    type: MarketplaceActionTypes.FETCH_PURCHASED_SUCCESS,
    payload: payload,
  };
};

const fetchPurchasedFailed = (payload) => {
  return {
    type: MarketplaceActionTypes.FETCH_PURCHASED_FAILED,
    payload: payload,
  };
};

const fetchMarketRequest = () => {
  return {
    type: MarketplaceActionTypes.FETCH_MARKET_REQUEST,
  };
};

const fetchMarketSuccess = (payload) => {
  return {
    type: MarketplaceActionTypes.FETCH_MARKET_SUCCESS,
    payload: payload,
  };
};

const fetchMarketFailed = (payload) => {
  return {
    type: MarketplaceActionTypes.FETCH_MARKET_FAILED,
    payload: payload,
  };
};

const purchaseItemRequest = () => {
  return {
    type: MarketplaceActionTypes.PURCHASE_ITEM_REQUEST,
  };
};

const purchaseItemSuccess = () => {
  return {
    type: MarketplaceActionTypes.PURCHASE_ITEM_SUCCESS,
  };
};

const purchaseItemFailed = (payload) => {
  return {
    type: MarketplaceActionTypes.PURCHASE_ITEM_FAILED,
    payload: payload,
  };
};

const withdrawItemRequest = () => {
  return {
    type: MarketplaceActionTypes.WITHDRAW_ITEM_REQUEST,
  };
};

const withdrawItemSuccess = () => {
  return {
    type: MarketplaceActionTypes.WITHDRAW_ITEM_SUCCESS,
  };
};

const withdrawItemFailed = (payload) => {
  return {
    type: MarketplaceActionTypes.WITHDRAW_ITEM_FAILED,
    payload: payload,
  };
};

const listItemRequest = () => {
  return {
    type: MarketplaceActionTypes.LIST_ITEM_REQUEST,
  };
};

const listItemSuccess = () => {
  return {
    type: MarketplaceActionTypes.LIST_ITEM_SUCCESS,
  };
};

const listItemFailed = (payload) => {
  return {
    type: MarketplaceActionTypes.LIST_ITEM_FAILED,
    payload: payload,
  };
};

export const fetchListedItems = () => {
  return async (dispatch) => {
    dispatch(fetchListedRequest());
    const blockchain = store.getState().blockchain;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          try {
            const listedItems = await blockchain.mergeSwordsToken.methods.fetchItemsCreated(blockchain.account).call();
            dispatch(fetchListedSuccess(convertItemsToMarketFormat(listedItems)));
          } catch (e) {
            dispatch(fetchListedFailed(e));
          }
        } else {
          dispatch(fetchListedFailed("Token object does not exist"));
        }
      } else {
        dispatch(fetchListedFailed("web3 object does not exist"));
      }
    } else {
      dispatch(fetchListedFailed("Account does not exist"));
    }
  };
};

export const fetchPurchasedItems = () => {
  return async (dispatch) => {
    dispatch(fetchPurchasedRequest());
    const blockchain = store.getState().blockchain;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          try {
            const purchasedItems = await blockchain.mergeSwordsToken.methods.fetchMyNFTs(blockchain.account).call();
            dispatch(fetchPurchasedSuccess(convertItemsToMarketFormat(purchasedItems)));
          } catch (e) {
            dispatch(fetchPurchasedFailed(e));
          }
        } else {
          dispatch(fetchPurchasedFailed("Token object does not exist"));
        }
      } else {
        dispatch(fetchPurchasedFailed("web3 object does not exist"));
      }
    } else {
      dispatch(fetchPurchasedFailed("Account does not exist"));
    }
  };
};

export const fetchMarketItemsAsync = () => {
  return async (dispatch) => {
    dispatch(fetchMarketRequest());
    const blockchain = store.getState().blockchain;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          try {
            const marketItems = await blockchain.mergeSwordsToken.methods.fetchMarketItems().call();
            dispatch(fetchMarketSuccess(convertItemsToMarketFormat(marketItems)));
          } catch (e) {
            dispatch(fetchMarketFailed(e));
          }
        } else {
          dispatch(fetchMarketFailed("Token object does not exist"));
        }
      } else {
        dispatch(fetchMarketFailed("web3 object does not exist"));
      }
    } else {
      dispatch(fetchMarketFailed("Account does not exist"));
    }
  };
};

export const purchaseItem = (marketItem) => {
  return async (dispatch) => {
    dispatch(purchaseItemRequest());
    const blockchain = store.getState().blockchain;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          try {
            await blockchain.mergeSwordsToken.methods
              .buyFromMarketPlace(marketItem.id, marketItem.marketId)
              .send({ from: blockchain.account, value: blockchain.web3.utils.toWei(marketItem.price, "ether") })
              .once("error", (e) => {
                dispatch(purchaseItemFailed(e));
              })
              .then(() => {});
            dispatch(purchaseItemSuccess());
            dispatch(fetchMarketItems());
            dispatch(getInventory());
          } catch (e) {
            dispatch(purchaseItemFailed(e));
          }
        } else {
          dispatch(purchaseItemFailed("Token object does not exist"));
        }
      } else {
        dispatch(purchaseItemFailed("web3 object does not exist"));
      }
    } else {
      dispatch(purchaseItemFailed("Account does not exist"));
    }
  };
};

export const withdrawItem = (marketItem) => {
  return async (dispatch) => {
    dispatch(withdrawItemRequest());
    const blockchain = store.getState().blockchain;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          try {
            await blockchain.mergeSwordsToken.methods
              .withdrawFromMarketPlace(marketItem.id, marketItem.marketId)
              .send({ from: blockchain.account })
              .once("error", (e) => {
                dispatch(withdrawItemFailed(e));
              })
              .then(() => {});
            dispatch(withdrawItemSuccess());
            dispatch(fetchListedItems());
            dispatch(getInventory());
          } catch (e) {
            dispatch(withdrawItemFailed(e));
          }
        } else {
          dispatch(withdrawItemFailed("Token object does not exist"));
        }
      } else {
        dispatch(withdrawItemFailed("web3 object does not exist"));
      }
    } else {
      dispatch(withdrawItemFailed("Account does not exist"));
    }
  };
};

export const listItem = (item, price) => {
  return async (dispatch) => {
    dispatch(listItemRequest());
    const blockchain = store.getState().blockchain;
    if (blockchain.account) {
      if (blockchain.web3) {
        if (blockchain.mergeSwordsToken) {
          try {
            await blockchain.mergeSwordsToken.methods
              // convert to wei
              .addToMarketPlace(item.id, blockchain.web3.utils.toWei(price, "ether"))
              .send({ from: blockchain.account })
              .once("error", (e) => {
                dispatch(listItemFailed(e));
              })
              .then(() => {});
            dispatch(listItemSuccess());
            dispatch(getInventory());
          } catch (e) {
            dispatch(listItemFailed(e));
          }
        } else {
          dispatch(listItemFailed("Token object does not exist"));
        }
      } else {
        dispatch(listItemFailed("web3 object does not exist"));
      }
    } else {
      dispatch(listItemFailed("Account does not exist"));
    }
  };
};
