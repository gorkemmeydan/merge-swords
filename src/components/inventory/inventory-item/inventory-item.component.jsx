import React, { useEffect, useState } from "react";

import ItemDetailsModal from "../../item-details-modal";

import PropTypes from "prop-types";

import styles from "./inventory-item.module.css";
import convertToBase64 from "../../../utils/convertToBase64.utils";

const InventoryItem = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageBase64, setImageBase64] = useState("");

  useEffect(() => {
    const base64data = convertToBase64(item.artwork);
    setImageBase64(base64data);
  }, [item]);

  return (
    <>
      <div className={styles.inventoryItemWrapper} onClick={() => setShowDetails(true)}>
        <img src={`data:image/svg+xml;base64,${imageBase64}`} />
      </div>

      <ItemDetailsModal show={showDetails} onHide={() => setShowDetails(false)} name={item.name} item={item} />
    </>
  );
};

InventoryItem.propTypes = {
  item: PropTypes.object,
};

export default InventoryItem;
