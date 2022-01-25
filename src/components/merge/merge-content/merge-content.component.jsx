import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mergeSwords, setSword_1, setSword_2 } from "../../../redux/merge/merge.actions";
import convertToBase64 from "../../../utils/convertToBase64.utils";
import InventoryModal from "../../inventory-modal";
import Spinner from "../../spinner";

import styles from "./merge-content.module.css";

const MergeContent = () => {
  const dispatch = useDispatch();
  const merge = useSelector((state) => state.merge);
  const inventory = useSelector((state) => state.inventory);
  const [showInventory_1, setShowInventory_1] = useState(false);
  const [showInventory_2, setShowInventory_2] = useState(false);

  const handleSelectSword_1 = (item) => {
    dispatch(setSword_1(item));
  };

  const handleSelectSword_2 = (item) => {
    dispatch(setSword_2(item));
  };

  const mergeSwordsAction = () => {
    if (merge.selected_1 && merge.selected_2) {
      if (merge.selected_1.id !== merge.selected_2.id) {
        dispatch(mergeSwords());
      } else return;
    } else return;
  };

  const renderMergeButton = () => {
    if (merge.loading) {
      return <Spinner />;
    } else {
      if (merge.selected_1 && merge.selected_2) {
        if (merge.selected_1.id !== merge.selected_2.id) {
          return (
            <div className={styles.mergeButton} onClick={mergeSwordsAction}>
              Merge!
            </div>
          );
        } else {
          return <div className={styles.mergeButton}>Selected Swords Must Be Different</div>;
        }
      } else {
        return <div className={styles.mergeButton}>Select Two Different Swords</div>;
      }
    }
  };

  const renderSelectButton_1 = () => {
    if (merge.selected_1) {
      return (
        <>
          <div className={styles.selectButton} onClick={() => setShowInventory_1(true)}>
            <img src={`data:image/svg+xml;base64,${convertToBase64(merge.selected_1.artwork)}`} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles.selectButton} onClick={() => setShowInventory_1(true)}>
            Select Sword 1
          </div>
        </>
      );
    }
  };

  const renderSelectButton_2 = () => {
    if (merge.selected_2) {
      return (
        <>
          <div className={styles.selectButton} onClick={() => setShowInventory_2(true)}>
            <img src={`data:image/svg+xml;base64,${convertToBase64(merge.selected_2.artwork)}`} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles.selectButton} onClick={() => setShowInventory_2(true)}>
            Select Sword 2
          </div>
        </>
      );
    }
  };

  return (
    <div className={styles.mergeContentWrapper}>
      <div className={styles.selectWrapper}>
        {renderSelectButton_1()}
        {renderSelectButton_2()}
        <InventoryModal
          show={showInventory_1}
          onHide={() => setShowInventory_1(false)}
          selectHandler={handleSelectSword_1}
          inventory={inventory}
        />
        <InventoryModal
          show={showInventory_2}
          onHide={() => setShowInventory_2(false)}
          selectHandler={handleSelectSword_2}
          inventory={inventory}
        />
        {renderMergeButton()}
      </div>
    </div>
  );
};

export default MergeContent;
