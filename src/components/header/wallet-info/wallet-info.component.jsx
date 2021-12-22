import React from 'react';

import Identicon from '../identicon/identicon.component';

import styles from './wallet-info.module.css';

const WalletInfo= () => {
  const account  = "0x771EB828646f62eFb75b190aA3C2037CbF3546CA";
  const etherBalance = 0.3126;

  return (
    <div className={styles.walletInfo}>
      <div className={styles.userBalance}>
        {etherBalance.toFixed(3)} ETH
      </div>
      <div className={styles.userAccount}>
        {account &&
          `${account.slice(0, 6)}...${account.slice(
            account.length - 4,
            account.length,
          )}`}
        <Identicon />
      </div>
    </div>
  );
};

export default WalletInfo;