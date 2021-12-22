import React from "react";
import { Link } from "react-router-dom";

import styles from "./route-button.module.css";

const RouteButton = ({buttonText, linkPath, inactive=false}) => {
  return (
    inactive ? (
      <button className={styles.routeButton}>
        {buttonText}
      </button>
    ) 
    : 
    (<Link to={linkPath}>
      <button className={styles.routeButton}>
        {buttonText}
      </button>
    </Link> )
  );
}

export default RouteButton;