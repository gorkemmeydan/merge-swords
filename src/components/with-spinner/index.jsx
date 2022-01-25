/* eslint-disable */
import React from "react";

import PropTypes from "prop-types";

import Spinner from "../spinner";

const WithSpinner =
  (WrappedComponent) =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
  };

export default WithSpinner;
