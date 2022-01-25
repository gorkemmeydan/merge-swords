/* eslint-disable */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSword, startBattle } from "../../../redux/battle/battle.actions";
import convertToBase64 from "../../../utils/convertToBase64.utils";
import InventoryModal from "../../inventory-modal";
import Spinner from "../../spinner";

import styles from "./battle-content.module.css";

const BattleContent = () => {
  const dispatch = useDispatch();
  const battle = useSelector((state) => state.battle);
  const inventory = useSelector((state) => state.inventory);
  const [showInventory, setShowInventory] = useState(false);

  const handleSelectSword = (item) => {
    dispatch(setSword(item));
  };

  const startBattleAction = () => {
    if (battle.selected) {
      dispatch(startBattle());
    } else return;
  };

  const renderSelectButton = () => {
    if (battle.selected) {
      return (
        <>
          <div className={styles.selectButton} onClick={() => setShowInventory(true)}>
            <img src={`data:image/svg+xml;base64,${convertToBase64(battle.selected.artwork)}`} />
          </div>
          <div className={styles.selectButton}>Attack Power: {battle.selected.attackPower}</div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles.selectButton} onClick={() => setShowInventory(true)}>
            Select Sword
          </div>
        </>
      );
    }
  };

  const renderBattleButton = () => {
    if (battle.loading) {
      return <Spinner />;
    } else {
      return (
        <div className={styles.battleButton} onClick={startBattleAction}>
          Battle!
        </div>
      );
    }
  };

  return (
    <div className={styles.battleContentWrapper}>
      <div className={styles.selectWrapper}>
        {renderSelectButton()}
        <InventoryModal
          show={showInventory}
          onHide={() => setShowInventory(false)}
          selectHandler={handleSelectSword}
          inventory={inventory}
        />
        {renderBattleButton()}
      </div>
    </div>
  );
};

export default BattleContent;
