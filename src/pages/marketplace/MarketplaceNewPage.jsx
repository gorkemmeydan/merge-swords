import React from "react";
import Header from "../../components/header";
import MarketplaceContent from "../../components/marketplace-content";
import MarketplaceNew from "../../components/marketplace-new";

const MarketplaceNewPage = () => {
  return (
    <div>
      <Header withBackButton={true} />
      <MarketplaceContent>
        <MarketplaceNew />
      </MarketplaceContent>
    </div>
  );
};

export default MarketplaceNewPage;
