import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchasedItems } from "../../redux/marketplace/marketplace.actions";
import MarketplaceItems from "../marketplace-items/marketplace-items.component";

const MarketplaceHistory = () => {
  const dispatch = useDispatch();
  const marketplace = useSelector((state) => state.marketplace);

  useEffect(() => {
    dispatch(fetchPurchasedItems());
  }, []);
  return <MarketplaceItems withNone={true} items={marketplace.purchasedItems} />;
};

export default MarketplaceHistory;
