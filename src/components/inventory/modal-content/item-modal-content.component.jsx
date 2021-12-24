import React from "react";

import styles from "./item-modal-content.module.css";

const ItemModalContent = (props) => {
  return (
    <div className={styles.itemModalContentWrapper}>
      <div 
        className={styles.itemArt}
        style = {{backgroundImage: "url(" + "https://i.imgur.com/b74UXcW.gif" + ")"}}
      >

      </div>
      <div className={styles.itemTraitsWrapper}>
        <div className={styles.itemTrait}>
          Attack Power: {props.attackPower}
        </div>
        <div className={styles.itemTrait}>
          Generation: {props.generation}
        </div>
        <div className={styles.itemTrait}>
          Sword Type: {props.swordType}
        </div>
        <div className={styles.itemTrait}>
          Sword Material : {props.swordMaterial}
        </div>
        <div className={styles.itemTrait}>
          Hilt Color: {props.hiltColor}
        </div>
      </div>
    </div>
  )
}

export default ItemModalContent;