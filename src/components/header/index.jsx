import React from "react";

import PropTypes from "prop-types";

import WalletInfo from "./wallet-info/wallet-info.component";

import styles from "./header.module.css";

import { useNavigate } from "react-router";
import TrashLink from "./trash-link/trash-link.component";
import TransferLink from "./transfer-link/transfer-link.component";
import MarketplaceLink from "./marketplace-link/marketplace-link.component";

const Header = ({ withBackButton = false }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/game");
  };

  const renderGoBackButton = () => {
    if (withBackButton) {
      return (
        <button className={styles.goBackButton} onClick={goBack}>
          Go Back
        </button>
      );
    } else return null;
  };

  return (
    <div className={styles.header}>
      <div className={styles.appNameGoBackWrapper}>
        <div className={styles.appName} onClick={goHome}>
          ⚔️ Merge Swords ⚔️
        </div>
        {renderGoBackButton()}
      </div>
      <div className={styles.userOperations}>
        <TrashLink />
        <TransferLink />
        <MarketplaceLink />
        <WalletInfo />
      </div>
    </div>
  );
};

Header.propTypes = {
  withBackButton: PropTypes.bool,
};

export default Header;
