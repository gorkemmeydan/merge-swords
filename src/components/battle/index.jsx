import React from "react";
import { useSelector } from "react-redux";
import BattleContent from "./battle-content/battle-content.component";
import ReplayContent from "./replay-content/replay-content.component";

const Battle = () => {
  const battle = useSelector((state) => state.battle);

  const renderBattleContent = () => {
    if (!battle.isAttackLogActive) {
      return <BattleContent />;
    } else {
      return <ReplayContent />;
    }
  };

  return renderBattleContent();
};

export default Battle;
