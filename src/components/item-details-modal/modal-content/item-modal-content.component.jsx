/* eslint react/prop-types: 0 */
import React from "react";

import PropTypes from "prop-types";

import styles from "./item-modal-content.module.css";
import convertToBase64 from "../../../utils/convertToBase64.utils";

const ItemModalContent = ({ item }) => {
  const imageBase64 = convertToBase64(item.artwork);

  return (
    <div className={styles.itemModalContentWrapper}>
      <div className={styles.itemArt}>
        <img src={`data:image/svg+xml;base64,${imageBase64}`} />
      </div>
      <div className={styles.itemTraitsWrapper}>
        <div className={styles.itemTrait}>Attack Power: {item.attackPower}</div>
        <div className={styles.itemTrait}>Generation: {item.generation}</div>
        <div className={styles.itemTrait}>Sword Type: {item.swordType}</div>
        <div className={styles.itemTrait}>Sword Material : {item.swordMaterial}</div>
        <div className={styles.itemTrait}>Hilt Color: {item.hiltColor}</div>
        <div className={styles.itemTrait}>DNA: {item.dna}</div>
      </div>
    </div>
  );
};

ItemModalContent.propTypes = {
  attackPower: PropTypes.string,
  generation: PropTypes.string,
  swordType: PropTypes.string,
  swordMaterial: PropTypes.string,
  hiltColor: PropTypes.string,
  dna: PropTypes.string,
};

export default ItemModalContent;
