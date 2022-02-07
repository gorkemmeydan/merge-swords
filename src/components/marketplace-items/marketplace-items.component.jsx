import React from "react";
import MarketplaceItem from "./marketplace-item/marketplace-item.component";

import PropTypes from "prop-types";
import styles from "./marketplace-items.module.css";

const MarketplaceItems = ({ items, withBuying, withNone }) => {
  return (
    <div className={styles.itemsContainer}>
      {items.map((item, id) => {
        return <MarketplaceItem withNone={withNone} withBuying={withBuying} key={id} item={item} />;
      })}
    </div>
  );
};

MarketplaceItems.propTypes = {
  items: PropTypes.array,
  withBuying: PropTypes.bool,
  withNone: PropTypes.bool,
};

export default MarketplaceItems;
