import React from "react";

import Modal from 'react-bootstrap/Modal'
import ItemModalContent from "../modal-content/item-modal-content.component";

import "./item-details-modal.styles.css";

const ItemDetailsModal = (props) => {
  return (
    <>
      <Modal
        size="lg"
        centered
        show={props.show}
        onHide={props.onHide}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ItemModalContent />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ItemDetailsModal;