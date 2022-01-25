import React from "react";

import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";

import "./inventory-modal.styles.css";
import ActiveInventoryItem from "./active-inventory-item/active-inventory-item.component";

const InventoryModal = (props) => {
  return (
    <>
      <Modal size="lg" centered show={props.show} onHide={props.onHide} className="x-modal">
        <Modal.Body>
          <div className="inventory-wrapper">
            {props.inventory.items.map((item, id) => {
              return (
                <ActiveInventoryItem key={id} item={item} handleClick={props.selectHandler} closeModal={props.onHide} />
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

InventoryModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  selectHandler: PropTypes.func,
  inventory: PropTypes.array,
};

export default InventoryModal;
