import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import convertToBase64 from "../../../utils/convertToBase64.utils";

import PropTypes from "prop-types";

import styles from "./marketplace-item.module.css";
import ItemDetailsModal from "../../item-details-modal";
import { purchaseItem, withdrawItem } from "../../../redux/marketplace/marketplace.actions";

const MarketplaceItem = ({ item, withBuying, withNone }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const dispatch = useDispatch();

  const handleAction = () => {
    if (withBuying) {
      dispatch(purchaseItem(item));
    } else {
      dispatch(withdrawItem(item));
    }
  };

  useEffect(() => {
    const base64data = convertToBase64(item.artwork);
    setImageBase64(base64data);
  }, [item]);

  const renderActionButton = () => {
    if (withNone) return null;
    if (withBuying) {
      return (
        <>
          <button className={styles.marketplaceItemButton} onClick={handleAction}>
            Buy
          </button>
        </>
      );
    } else {
      return (
        <>
          <button className={styles.marketplaceItemButton} onClick={handleAction}>
            Withdraw
          </button>
        </>
      );
    }
  };

  return (
    <div className={styles.marketplaceItemWrapper}>
      <div className={styles.marketplaceItemArt} onClick={() => setShowDetails(true)}>
        <img src={`data:image/svg+xml;base64,${imageBase64}`} />
      </div>
      <div>{item.name}</div>
      <div className={styles.informationAndActions}>
        <div>{item.price} AVAX</div>
        {renderActionButton()}
      </div>
      <ItemDetailsModal
        isMarket={true}
        show={showDetails}
        onHide={() => setShowDetails(false)}
        name={item.name}
        item={item}
      />
    </div>
  );
};

MarketplaceItem.propTypes = {
  item: PropTypes.object,
  withBuying: PropTypes.bool,
  withNone: PropTypes.bool,
};

export default MarketplaceItem;
