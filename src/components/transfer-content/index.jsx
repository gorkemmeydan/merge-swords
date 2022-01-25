import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner";
import { setSwordTransfer, transferSword } from "../../redux/transfer/transfer.actions";
import convertToBase64 from "../../utils/convertToBase64.utils";
import InventoryModal from "../inventory-modal";

import styles from "./transfer-content.module.css";
import { Form } from "react-bootstrap";

const TransferContent = () => {
  const dispatch = useDispatch();
  const transfer = useSelector((state) => state.transfer);
  const inventory = useSelector((state) => state.inventory);
  const [showInventory, setShowInventory] = useState(false);
  const [address, setAddress] = useState("");

  const handleSelectSword = (item) => {
    dispatch(setSwordTransfer(item));
  };

  const startTransferAction = (address) => {
    if (transfer.selected && address != "") {
      dispatch(transferSword(address));
    } else return;
  };

  const renderSelectButton = () => {
    if (transfer.selected) {
      return (
        <>
          <div className={styles.selectButton} onClick={() => setShowInventory(true)}>
            <img src={`data:image/svg+xml;base64,${convertToBase64(transfer.selected.artwork)}`} />
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
    if (!transfer.loading) {
      return (
        <div className={styles.selectButton} onClick={() => startTransferAction(address)}>
          Transfer!
        </div>
      );
    } else {
      return <Spinner />;
    }
  };

  return (
    <div className={styles.transferContentWrapper}>
      <div className={styles.selectWrapper}>
        {renderSelectButton()}
        <InventoryModal
          show={showInventory}
          onHide={() => setShowInventory(false)}
          selectHandler={handleSelectSword}
          inventory={inventory}
        />
        <Form>
          <Form.Group className="mb-3" controlId="addressForm.ControlInput1">
            <Form.Label style={{ color: "white" }}>Account Address</Form.Label>
            <Form.Control size="lg" placeholder="0x..." onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>
        </Form>
        {renderTransferButton()}
      </div>
    </div>
  );
};

export default TransferContent;
