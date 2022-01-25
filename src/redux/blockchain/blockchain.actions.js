import store from "../store";
import Web3 from "web3";
import MergeSwordsToken from "../../contracts/MergeSwordsToken.json";
import BlockchainActionTypes from "./blockchain.types";

const connectRequest = () => {
  return {
    type: BlockchainActionTypes.CONNECTION_REQUEST,
  };
};

const connectSuccess = (payload) => {
  return {
    type: BlockchainActionTypes.CONNECTION_SUCCESS,
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: BlockchainActionTypes.CONNECTION_FAILED,
    payload: payload,
  };
};

const balanceRequest = () => {
  return {
    type: BlockchainActionTypes.BALANCE_REQUEST,
  };
};

const balanceSuccess = (payload) => {
  return {
    type: BlockchainActionTypes.BALANCE_SUCCESS,
    payload: payload,
  };
};

const balanceFailed = (payload) => {
  return {
    type: BlockchainActionTypes.CONNECTION_FAILED,
    paylaod: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: BlockchainActionTypes.UPDATE_ACCOUNT,
    payload: payload,
  };
};

export const checkAccount = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        // 1337
        const mergeSwordsTokenNetworkData = await MergeSwordsToken.networks[networkId];
        if (mergeSwordsTokenNetworkData) {
          const mergeSwordsToken = new web3.eth.Contract(MergeSwordsToken.abi, mergeSwordsTokenNetworkData.address);
          dispatch(
            connectSuccess({
              account: accounts[0],
              mergeSwordsToken: mergeSwordsToken,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Polygon."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        // console.log(networkId);
        // 1337
        const mergeSwordsTokenNetworkData = await MergeSwordsToken.networks[networkId];
        console.log(mergeSwordsTokenNetworkData.adress);
        console.log(accounts[0]);
        if (mergeSwordsTokenNetworkData) {
          const mergeSwordsToken = new web3.eth.Contract(
            MergeSwordsToken.abi,
            mergeSwordsTokenNetworkData.adress
            // "0x247700BBab4dC984547444eCaa95f4E3Ed5dEC74"
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              mergeSwordsToken: mergeSwordsToken,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Polygon."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    // dispatch(fetchData(account));
  };
};

export const checkBalance = () => {
  return async (dispatch) => {
    dispatch(balanceRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      const account = store.getState().blockchain.account;
      if (account) {
        try {
          let balance = await web3.eth.getBalance(account);
          balance = parseFloat(Web3.utils.fromWei(balance).toString());
          dispatch(balanceSuccess({ balance: balance }));
        } catch (e) {
          dispatch(balanceFailed(e));
        }
      } else {
        dispatch(balanceFailed("Must log in"));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};
