import React from "react";

import PropTypes from "prop-types";

import InventoryItem from "./inventory-item/inventory-item.component";

import styles from "./inventory.module.css";

const Inventory = ({ items }) => {
  return (
    <div className={styles.inventoryWrapper}>
      {items.map((item, id) => {
        return <InventoryItem key={id} item={item} />;
      })}
    </div>
  );
};

Inventory.propTypes = {
  items: PropTypes.array,
};

export default Inventory;
