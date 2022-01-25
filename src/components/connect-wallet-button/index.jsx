import React from "react";

import { useDispatch } from "react-redux";
import { connect } from "../../redux/blockchain/blockchain.actions";

import styles from "./connect-wallet-button.module.css";

const ConnectWalletButton = () => {
  const dispatch = useDispatch();

  const connectWallet = () => {
    dispatch(connect());
  };

  return (
    <button onClick={connectWallet} className={`${styles.ctaButton} ${styles.connectWalletButton}`}>
      Connect to Wallet
    </button>
  );
};

export default ConnectWalletButton;
