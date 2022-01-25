import React, { useEffect } from "react";

import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { checkAccount } from "../../redux/blockchain/blockchain.actions";

import ConnectWalletButton from "../../components/connect-wallet-button";
import WelcomeText from "../../components/welcome-text";

import styles from "./homepage.module.css";
import ErrorText from "../../components/error-text";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  useEffect(() => {
    dispatch(checkAccount());
  }, []);

  useEffect(() => {
    if (blockchain.account) {
      return navigate("/game", { replace: true });
    }
  }, [blockchain]);

  return (
    <div className={styles.homePageWrapper}>
      <WelcomeText />
      <ConnectWalletButton />
      <ErrorText />
    </div>
  );
};

export default HomePage;
