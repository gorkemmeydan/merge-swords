import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getInventory } from "../../redux/inventory/inventory.actions";

import Header from "../../components/header";
import InventoryContainer from "../../components/inventory";
import GameButtonsContainer from "../../components/game-buttons";

import styles from "./gamepage.module.css";

const GamePage = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getInventory());
  }, []);

  // useEffect(() => {
  //   console.log(inventory.items);
  // }, [inventory]);

  return (
    <div className={styles.gamePageWrapper}>
      <Header />
      <div className={styles.controlsWrapper}>
        <div className={styles.buttonsWrapper}>
          <GameButtonsContainer isLoading={inventory.isLoading} itemCount={inventory.items.length} />
        </div>
        <div className={styles.inventoryWrapper}>
          <InventoryContainer isLoading={inventory.loading} items={inventory.items} />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
