import React from "react";
import { BiTransfer } from "react-icons/bi";
import { Link } from "react-router-dom";

import styles from "./transfer-link.module.css";

const TransferLink = () => {
  return (
    <div className={styles.transferLinkWrapper}>
      <Link to={"/game/transfer"}>
        <BiTransfer />
      </Link>
    </div>
  );
};

export default TransferLink;
