import React from "react";
import Header from "../../components/header";
import Merge from "../../components/merge";

const MergePage = () => {
  return (
    <div>
      <Header withBackButton={true} />
      <Merge />
    </div>
  );
};

export default MergePage;
