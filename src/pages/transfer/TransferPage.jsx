import React from "react";
import Header from "../../components/header";
import TransferContent from "../../components/transfer-content";

const TransferPage = () => {
  return (
    <div>
      <Header withBackButton={true} />
      <TransferContent />
    </div>
  );
};

export default TransferPage;
