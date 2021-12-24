import React from "react";
import BattleContent from "./battle-content/battle-content.component";
import ReplayContent from "./replay-content/replay-content.component";

const Battle = () => {
  const replaying = false;
  
  const renderBattleContent = () => {
    if (!replaying) {
      return <BattleContent />
    } else {
      return <ReplayContent />
    }
  }

  return (
    renderBattleContent()
  )
}

export default Battle;