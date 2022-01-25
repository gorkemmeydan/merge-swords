import React from "react";
import { useDispatch } from "react-redux";
import { mintNewSword } from "../../redux/mint/mint.actions";

import styles from "./mint-sword-button.module.css";

const MintSwordButton = () => {
  const dispatch = useDispatch();

  const onMintRequest = () => {
    dispatch(mintNewSword());
  };

  return (
    <button onClick={onMintRequest} className={styles.mintSwordButton}>
      Mint Sword ⚔️
    </button>
  );
};

export default MintSwordButton;
