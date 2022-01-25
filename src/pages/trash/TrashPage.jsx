import React from "react";
import Header from "../../components/header";
import TrashContent from "../../components/trash-content";

const TrashPage = () => {
  return (
    <div>
      <Header withBackButton={true} />
      <TrashContent />
    </div>
  );
};

export default TrashPage;
