import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketItemsAsync } from "../../redux/marketplace/marketplace.actions";
import MarketplaceItems from "../marketplace-items/marketplace-items.component";

const Marketplace = () => {
  const dispatch = useDispatch();
  const marketplace = useSelector((state) => state.marketplace);

  useEffect(() => {
    dispatch(fetchMarketItemsAsync());
  }, []);
  return <MarketplaceItems withBuying={true} items={marketplace.marketItems} />;
};

export default Marketplace;
