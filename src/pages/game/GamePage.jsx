import React from "react";

import Header from "../../components/header";
import InventoryContainer from "../../components/inventory";
import GameButtons from "../../components/game-buttons";

import styles from "./gamepage.module.css";

const GamePage = () => {

  return (
    <div className={styles.gamePageWrapper}>
      <Header />
      <div className={styles.controlsWrapper}>
        <div className={styles.buttonsWrapper}>
          <GameButtons />
        </div>
        <div className={styles.inventoryWrapper}>
          <InventoryContainer isLoading={false}/>
        </div>
      </div>      
    </div>
  )
}

export default GamePage;