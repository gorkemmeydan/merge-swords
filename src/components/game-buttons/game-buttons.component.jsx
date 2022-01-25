import React from "react";
import PropTypes from "prop-types";

import MintSwordButtonContainer from "../mint-sword-button";
import RouteButton from "../route-button";

import styles from "./game-buttons.module.css";
import { useSelector } from "react-redux";

const GameButtons = ({ itemCount }) => {
  const mintLoading = useSelector((state) => state.mint.loading);

  const renderMintSword = () => {
    if (itemCount === 0) {
      return <MintSwordButtonContainer isLoading={mintLoading} />;
    } else return null;
  };

  return (
    <>
      <div className={styles.buttonWrapper}>
        <RouteButton buttonText="Battle 🗡️" linkPath="/game/battle" />
      </div>
      <div className={styles.buttonWrapper}>
        <RouteButton buttonText="Merge 🧬" linkPath="/game/merge" />
      </div>
      {renderMintSword()}
    </>
  );
};

GameButtons.propTypes = {
  itemCount: PropTypes.number,
};

export default GameButtons;
