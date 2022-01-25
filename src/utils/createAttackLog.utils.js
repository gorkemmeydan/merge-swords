const createAttackLog = (plainLog) => {
  const userAP = plainLog.userNormalizedAP;
  const monsterAP = plainLog.monsterNormalizedAP;
  let userStart = plainLog.userStart;
  let userHealth = 100;
  let monsterHealth = 100;

  const attackLog = [];
  while (userHealth !== 0 && monsterHealth !== 0) {
    if (userStart) {
      if (userAP > monsterHealth) {
        monsterHealth = 0;
        attackLog.push({ user: userHealth, monster: monsterHealth });
      } else {
        monsterHealth = monsterHealth - userAP;
        attackLog.push({ user: userHealth, monster: monsterHealth });
      }
      userStart = !userStart;
    } else {
      if (monsterAP > userHealth) {
        userHealth = 0;
        attackLog.push({ user: userHealth, monster: monsterHealth });
      } else {
        userHealth = userHealth - monsterAP;
        attackLog.push({ user: userHealth, monster: monsterHealth });
      }
      userStart = !userStart;
    }
  }
  return attackLog;
};

export default createAttackLog;
