import React, { useState } from "react";

import ItemDetailsModal from "../item-details-modal/item-details-modal.component";

import styles from "./inventory-item.module.css";

const InventoryItem = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div 
        className={styles.inventoryItemWrapper}
        onClick={() => setShowDetails(true)}
      >
        X
      </div>

      <ItemDetailsModal 
        show={showDetails}
        onHide={() => setShowDetails(false)}
        name={"xxx"}
      />
    </>
  )
}

export default InventoryItem;