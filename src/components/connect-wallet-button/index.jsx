import React from "react";

import styles from "./connect-wallet-button.module.css";

const ConnectWalletButton = () => {
  const connectWallet = () => {

  }

  return (
    <button onClick={connectWallet} className={`${styles.ctaButton} ${styles.connectWalletButton}`}>
      Connect to Wallet
    </button>
  )
}

export default ConnectWalletButton;