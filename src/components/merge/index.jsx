import React from "react";
import { useSelector } from "react-redux";

import MergeContent from "./merge-content/merge-content.component";
import NewItemContent from "./new-item-content/new-item-content.component";

const Merge = () => {
  const merge = useSelector((state) => state.merge);

  const renderMergeContent = () => {
    if (!merge.isNewItem) {
      return <MergeContent />;
    } else {
      return <NewItemContent />;
    }
  };

  return renderMergeContent();
};

export default Merge;
