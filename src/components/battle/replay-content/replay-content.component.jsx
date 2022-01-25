import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearBattleLog } from "../../../redux/battle/battle.actions";
import createAttackLog from "../../../utils/createAttackLog.utils";
import ItemDetailsModal from "../../item-details-modal";

import styles from "./replay-component.module.css";

const ReplayContent = () => {
  const dispatch = useDispatch();
  const battle = useSelector((state) => state.battle);
  const inventory = useSelector((state) => state.inventory);
  const [turnLog, setTurnLog] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (battle.attackLog) {
      setTurnLog(createAttackLog(battle.attackLog));
    }
  }, [battle]);

  const handleContinueAction = () => {
    dispatch(clearBattleLog());
  };

  const renderBattleHeader = () => {
    if (battle?.attackLog?.didUserWin) {
      return <div className={styles.greenHeader}>✨️ You Won! ✨️</div>;
    } else {
      return <div className={styles.redHeader}>💀️ You Lost 💀️</div>;
    }
  };

  const renderNewItem = () => {
    if (battle?.attackLog?.didUserWin) {
      const lastItem = inventory.items.slice(-1);
      return (
        <>
          <div className={styles.newItem} onClick={() => setShowDetails(true)}>
            🎁️
          </div>
          <ItemDetailsModal
            show={showDetails}
            onHide={() => setShowDetails(false)}
            name={lastItem[0].name}
            item={lastItem[0]}
          />
        </>
      );
    } else return null;
  };

  const createTableFromLog = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>User Health</th>
            <th>Enemy Health</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100</td>
            <td>100</td>
          </tr>
          {turnLog.map((ll, idx) => (
            <tr key={idx}>
              <td>{ll.user}</td>
              <td>{ll.monster}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.replayContentWrapper}>
      {renderBattleHeader()}
      {renderNewItem()}
      <div className={styles.logHeader}>Battle Log</div>
      <div className={styles.logTableWrapper}>{createTableFromLog()}</div>
      <div className={styles.continueButton} onClick={handleContinueAction}>
        Continue
      </div>
    </div>
  );
};

export default ReplayContent;
