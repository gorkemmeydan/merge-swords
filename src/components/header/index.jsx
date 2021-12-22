import React from 'react';

import WalletInfo from './wallet-info/wallet-info.component';

import styles from "./header.module.css";

import { useNavigate } from "react-router";


const Header = ({withBackButton=false}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  const renderGoBackButton = () => {
    if (withBackButton) {
      return (
        <button 
          className={styles.goBackButton}
          onClick={goBack}
        >
          Go Back
        </button>
      );
    } else return null;
  }

  return (
    <div className={styles.header}>
      <div className={styles.appNameGoBackWrapper}>
        <div className={styles.appName}>
          ⚔️ Merge Swords ⚔️
        </div>
        {renderGoBackButton()}
      </div>
      <div className={styles.userOperations}>
        <WalletInfo />
      </div>
    </div>
  );
}

export default Header;