import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import styles from "./route-button.module.css";

const RouteButton = ({ buttonText, linkPath, inactive = false }) => {
  return inactive ? (
    <button className={styles.routeButton}>{buttonText}</button>
  ) : (
    <Link to={linkPath}>
      <button className={styles.routeButton}>{buttonText}</button>
    </Link>
  );
};

RouteButton.propTypes = {
  buttonText: PropTypes.string,
  linkPath: PropTypes.string,
  inactive: PropTypes.bool,
};

export default RouteButton;
