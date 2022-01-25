import React from "react";
import { Link } from "react-router-dom";

import styles from "./marketplace-link.module.css";

const MarketplaceLink = () => {
  return (
    <div className={styles.transferLinkWrapper}>
      <Link to={"/game/marketplace"}>Marketplace</Link>
    </div>
  );
};

export default MarketplaceLink;
