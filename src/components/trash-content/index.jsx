import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner";
import { setSwordTrash, sendSwordToTrash } from "../../redux/trash/trash.actions";
import convertToBase64 from "../../utils/convertToBase64.utils";
import InventoryModal from "../inventory-modal";

import styles from "./trash-content.module.css";

const TrashContent = () => {
  const dispatch = useDispatch();
  const trash = useSelector((state) => state.trash);
  const inventory = useSelector((state) => state.inventory);
  const [showInventory, setShowInventory] = useState(false);

  const handleSelectSword = (item) => {
    dispatch(setSwordTrash(item));
  };

  const startTrashAction = () => {
    if (trash.selected) {
      dispatch(sendSwordToTrash());
    } else return;
  };

  const renderSelectButton = () => {
    if (trash.selected) {
      return (
        <>
          <div className={styles.selectButton} onClick={() => setShowInventory(true)}>
            <img src={`data:image/svg+xml;base64,${convertToBase64(trash.selected.artwork)}`} />
          </div>
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

  const renderBurnButton = () => {
    if (!trash.loading) {
      return (
        <div className={styles.selectButton} onClick={startTrashAction}>
          Burn!
        </div>
      );
    } else {
      return <Spinner />;
    }
  };

  return (
    <div className={styles.trashContentWrapper}>
      <div className={styles.selectWrapper}>
        {renderSelectButton()}
        <InventoryModal
          show={showInventory}
          onHide={() => setShowInventory(false)}
          selectHandler={handleSelectSword}
          inventory={inventory}
        />
        {renderBurnButton()}
      </div>
    </div>
  );
};

export default TrashContent;
