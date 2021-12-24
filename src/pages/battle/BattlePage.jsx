import React from "react";
import Battle from "../../components/battle";
import Header from "../../components/header";

const BattlePage = () => {
  return (
    <div>
      <Header withBackButton={true}/>
      <Battle />
    </div>
  );
}

export default BattlePage;