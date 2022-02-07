import React from "react";
import Header from "../../components/header";
import MarketplaceContent from "../../components/marketplace-content";
import MarketplaceListed from "../../components/marketplace-listed";

const MarketplaceListedPage = () => {
  return (
    <div>
      <Header withBackButton={true} />
      <MarketplaceContent>
        <MarketplaceListed />
      </MarketplaceContent>
    </div>
  );
};

export default MarketplaceListedPage;
