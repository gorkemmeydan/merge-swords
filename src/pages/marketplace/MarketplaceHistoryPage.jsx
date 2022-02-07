import React from "react";
import Header from "../../components/header";
import MarketplaceContent from "../../components/marketplace-content";
import MarketplaceHistory from "../../components/marketplace-history";

const MarketplaceHistoryPage = () => {
  return (
    <div>
      <Header withBackButton={true} />
      <MarketplaceContent>
        <MarketplaceHistory />
      </MarketplaceContent>
    </div>
  );
};

export default MarketplaceHistoryPage;
