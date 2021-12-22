import React from "react";
import ConnectWalletButton from "../../components/connect-wallet-button";
import WelcomeText from "../../components/welcome-text";

import styles from "./homepage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homePageWrapper}>
      <WelcomeText />
      <ConnectWalletButton />
    </div>
  )
}

export default HomePage;