import React from "react";
import Header from "../../components/header";
import MarketplaceContent from "../../components/marketplace-content";

const MarketplacePage = () => {
  return (
    <div>
      <Header withBackButton={true} />
      <MarketplaceContent />
    </div>
  );
};

export default MarketplacePage;
