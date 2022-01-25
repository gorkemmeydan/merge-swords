import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewItemActive } from "../../../redux/merge/merge.actions";
import ItemDetailsModal from "../../item-details-modal";

import styles from "./new-item-content.module.css";

const NewItemContent = () => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);
  // const merge = useSelector((state) => state.merge);

  const handleContinueAction = () => {
    dispatch(setNewItemActive(false));
  };

  const renderNewItem = () => {
    const lastItem = inventory.items.slice(-1);
    return (
      <>
        <div className={styles.newItem} onClick={() => setShowDetails(true)}>
          ❔️
        </div>
        <ItemDetailsModal
          show={showDetails}
          onHide={() => setShowDetails(false)}
          name={lastItem[0].name}
          item={lastItem[0]}
        />
      </>
    );
  };

  return (
    <div className={styles.newItemContentWrapper}>
      {renderNewItem()}
      <div className={styles.continueButton} onClick={handleContinueAction}>
        Continue
      </div>
    </div>
  );
};

export default NewItemContent;
