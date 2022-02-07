import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { checkBalance } from "../../../redux/blockchain/blockchain.actions";

import Identicon from "../identicon/identicon.component";

import styles from "./wallet-info.module.css";

const WalletInfo = () => {
  const dispatch = useDispatch();

  const account = useSelector((state) => state.blockchain.account);
  const etherBalance = useSelector((state) => state.blockchain.balance);

  useEffect(() => {
    const internal = setInterval(() => {
      dispatch(checkBalance());
    }, 10000);

    return () => {
      if (internal) {
        clearInterval(internal);
      }
    };
  }, [account]);

  useEffect(() => {
    dispatch(checkBalance());
  }, [account]);

  return (
    <div className={styles.walletInfo}>
      <div className={styles.userBalance}>{etherBalance ? etherBalance.toFixed(3) : 0} AVAX</div>
      <div className={styles.userAccount}>
        {account && `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`}
        <Identicon />
      </div>
    </div>
  );
};

export default WalletInfo;
