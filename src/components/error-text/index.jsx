import React from "react";

import { useSelector } from "react-redux";

import styles from "./error-text.module.css";

const ErrorText = () => {
  const blockchain = useSelector((state) => state.blockchain);

  const renderError = () => {
    if (blockchain.errorMsg === "") {
      return null;
    }
    return <div className={styles.errorWrapper}>{blockchain.errorMsg}</div>;
  };

  return renderError();
};

export default ErrorText;
