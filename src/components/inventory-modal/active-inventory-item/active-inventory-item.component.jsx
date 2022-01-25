import React from "react";

import PropTypes from "prop-types";

import styles from "./active-inventory-item.module.css";
import convertToBase64 from "../../../utils/convertToBase64.utils";

const ActiveInventoryItem = (props) => {
  const handleClickOperation = (item) => {
    props.handleClick(item);
    props.closeModal();
  };

  return (
    <>
      <div className={styles.inventoryItemWrapper} onClick={() => handleClickOperation(props.item)}>
        <img src={`data:image/svg+xml;base64,${convertToBase64(props.item.artwork)}`} />
        <span className={styles.toolTip}>Attack Power: {props.item.attackPower}</span>
      </div>
    </>
  );
};

ActiveInventoryItem.propTypes = {
  item: PropTypes.object,
  handleClick: PropTypes.func,
  closeModal: PropTypes.func,
};

export default ActiveInventoryItem;
