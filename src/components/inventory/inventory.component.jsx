import React from "react";
import InventoryItem from "./inventory-item/inventory-item.component";

import styles from "./inventory.module.css";

const Inventory = () => {
  const items = [1,2,3,4,5,6,7,8,9,10];
  return (
    <div className={styles.inventoryWrapper}>
      {
        items.map((id) => {
          return (
            <InventoryItem key={id}/>
          )
        })
      }
    </div>
  )
}

export default Inventory;