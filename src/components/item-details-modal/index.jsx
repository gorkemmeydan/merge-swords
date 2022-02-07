import React from "react";

import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";
import ItemModalContent from "./modal-content/item-modal-content.component";

import "./item-details-modal.styles.css";

const ItemDetailsModal = (props) => {
  return (
    <>
      <Modal size="lg" centered show={props.show} onHide={props.onHide} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{props.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ItemModalContent item={props.item} isMarket={props.isMarket} />
        </Modal.Body>
      </Modal>
    </>
  );
};

ItemDetailsModal.propTypes = {
  isMarket: PropTypes.bool,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  name: PropTypes.string,
  item: PropTypes.object,
};

export default ItemDetailsModal;
