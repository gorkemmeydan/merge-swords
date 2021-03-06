import React from "react";
import Header from "../../components/header";
import Marketplace from "../../components/marketplace";
import MarketplaceContent from "../../components/marketplace-content";

const MarketplacePage = () => {
  return (
    <div>
      <Header withBackButton={true} />
      <MarketplaceContent>
        <Marketplace />
      </MarketplaceContent>
    </div>
  );
};

export default MarketplacePage;
