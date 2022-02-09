import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner";
import convertToBase64 from "../../utils/convertToBase64.utils";
import InventoryModal from "../inventory-modal";

import styles from "./marketplace-new.module.css";
import { listItem } from "../../redux/marketplace/marketplace.actions";

const MarketplaceNew = () => {
  const dispatch = useDispatch();
  const marketplace = useSelector((state) => state.marketplace);
  const inventory = useSelector((state) => state.inventory);
  const [showInventory, setShowInventory] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [price, setPrice] = useState("");

  const handleSelectSword = (item) => {
    setSelected(item);
  };

  const startListAction = () => {
    if (selected && price !== "") {
      dispatch(listItem(selected, price));
      setSelected(undefined);
    } else return;
  };

  const renderSelectButton = () => {
    if (selected) {
      return (
        <>
          <div className={styles.selectButton} onClick={() => setShowInventory(true)}>
            <img src={`data:image/svg+xml;base64,${convertToBase64(selected.artwork)}`} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles.selectButton} onClick={() => setShowInventory(true)}>
            Select Sword
          </div>
        </>
      );
    }
  };

  const renderTransferButton = () => {
    if (!marketplace.loading) {
      return (
        <div className={styles.selectButton} onClick={() => startListAction()}>
          List!
        </div>
      );
    } else {
      return <Spinner />;
    }
  };

  return (
    <div className={styles.marketplaceNewWrapper}>
      <div className={styles.selectWrapper}>
        {renderSelectButton()}
        <InventoryModal
          show={showInventory}
          onHide={() => setShowInventory(false)}
          selectHandler={handleSelectSword}
          inventory={inventory}
        />
        <Form>
          <Form.Group className="mb-3" controlId="priceForm.ControlInput1">
            <Form.Label style={{ color: "white" }}>Listing Price</Form.Label>
            <Form.Control size="lg" placeholder="in MATIC" onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
        </Form>
        {renderTransferButton()}
      </div>
    </div>
  );
};

export default MarketplaceNew;
