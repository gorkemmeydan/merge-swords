// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./SwordFactory.sol";

contract SwordAttack is SwordFactory {
  // nonce for random number
  uint256 private randNonceSwordAttack = 0;

  struct AttackLog {
    bool userStart;
    uint256 userAttackPower;
    uint256 monsterAttackPower;
    uint256 userNormalizedAP;
    uint256 monsterNormalizedAP;
    bool didUserWin;
  }

  // make fight mechanic idle, monster and user autofights until one is done
  function attackMonster(uint256 _attackPower) internal returns (AttackLog memory) {
    // monster stats
    uint256 monsterAttackPower = calculateMonsterAttackPower(_attackPower);

    // normalize their attack powers to not oneshot each other
    uint256 userNormalizedAP = normalizeAttackPower(_attackPower, monsterAttackPower);
    uint256 monsterNormalizedAP = normalizeAttackPower(monsterAttackPower, _attackPower);

    // randomly select the first attacker
    // 1 means user starts
    bool userStarts = headsTails();

    uint256 userHits = 100 / userNormalizedAP;
    uint256 monsterHits = 100 / monsterNormalizedAP;

    if (userStarts) {
      userHits = userHits - 1;

      if (userHits <= monsterHits) {
        return
          AttackLog(
            true, // user starts
            _attackPower,
            monsterAttackPower,
            userNormalizedAP,
            monsterNormalizedAP,
            true // user wins
          );
      } else {
        return
          AttackLog(
            true, // user starts
            _attackPower,
            monsterAttackPower,
            userNormalizedAP,
            monsterNormalizedAP,
            false // monster wins
          );
      }
    } else {
      // monster starts
      monsterHits = monsterHits - 1;

      if (monsterHits <= userHits) {
        return
          AttackLog(
            false, // monster starts
            _attackPower,
            monsterAttackPower,
            userNormalizedAP,
            monsterNormalizedAP,
            false // monster wins
          );
      } else {
        return
          AttackLog(
            false, // monster starts
            _attackPower,
            monsterAttackPower,
            userNormalizedAP,
            monsterNormalizedAP,
            true // user wins
          );
      }
    }
  }

  function normalizeAttackPower(uint256 _firstAP, uint256 _secondAP) private pure returns (uint256) {
    uint256 temp = _firstAP * 10;
    return temp / _secondAP;
  }

  function randomNumberUpTo(uint8 _upperLimit) private returns (uint8) {
    // between 0 and _upperLimit
    require(_upperLimit > 0, "Upper limit should > 0");
    randNonceSwordAttack = randNonceSwordAttack + 1;
    return
      uint8(
        uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, randNonceSwordAttack))) % _upperLimit
      );
  }

  function headsTails() private returns (bool) {
    // 0 -> heads, 1 -> tails
    randNonceSwordAttack = randNonceSwordAttack + 1;
    return (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, randNonceSwordAttack))) % 2) > 0;
  }

  function calculateMonsterAttackPower(uint256 _attackPower) private returns (uint256) {
    bool posOrNegative = headsTails();
    uint8 monsterModifierMod = randomNumberUpTo(5);
    // make sure it is not zero and minimum one third and max one in eight
    monsterModifierMod = monsterModifierMod + 3;

    // monster attack power randomly bigger or smaller than user
    if (posOrNegative) {
      return _attackPower + (_attackPower % monsterModifierMod);
    } else {
      uint256 randomMod = _attackPower % monsterModifierMod;
      if (randomMod != _attackPower) {
        return _attackPower - randomMod;
      } else {
        return _attackPower;
      }
    }
  }
}
