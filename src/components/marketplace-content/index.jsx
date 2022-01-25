/* eslint-disable */
import React from "react";
import MarketplaceHeader from "./marketplace-header/marketplace-header.component";

// import styles from "./marketplace-content.module.css";

const MarketplaceContent = ({ children }) => {
  return (
    <div>
      <MarketplaceHeader />
      {children}
    </div>
  );
};

export default MarketplaceContent;
