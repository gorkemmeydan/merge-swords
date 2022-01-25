import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import styles from "./trash-link.module.css";

const TrashLink = () => {
  return (
    <div className={styles.trashLinkWrapper}>
      <Link to={"/game/trash"}>
        <BsFillTrashFill />
      </Link>
    </div>
  );
};

export default TrashLink;
