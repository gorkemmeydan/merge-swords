import React from "react";
import RouteButton from "../route-button";

import styles from "./game-buttons.module.css";

const GameButtons = () => {
  const doesNotOwnSword = true;

  const renderMintSword = () => {
    if(doesNotOwnSword) {
      return (
        <div className={styles.buttonWrapper}>
          <RouteButton buttonText="Mint Sword ⚔️" linkPath="" inactive={true} />
        </div>
      )
    } else return null;
  }

  return (
    <>
      <div className={styles.buttonWrapper}>
        <RouteButton buttonText="Battle 🗡️" linkPath="/game/battle"/>
      </div>
      <div className={styles.buttonWrapper}>
        <RouteButton buttonText="Merge 🧬" linkPath="/game/merge"/>
      </div>
      {renderMintSword()}
    </>
  )
}

export default GameButtons;