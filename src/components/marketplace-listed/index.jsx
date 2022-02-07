import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListedItems } from "../../redux/marketplace/marketplace.actions";
import MarketplaceItems from "../marketplace-items/marketplace-items.component";

const MarketplaceListed = () => {
  const dispatch = useDispatch();
  const marketplace = useSelector((state) => state.marketplace);

  useEffect(() => {
    dispatch(fetchListedItems());
  }, []);
  return <MarketplaceItems items={marketplace.listedItems} />;
};

export default MarketplaceListed;
