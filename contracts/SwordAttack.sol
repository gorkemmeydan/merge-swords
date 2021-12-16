// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./SwordFactory.sol";

contract SwordAttack is SwordFactory {
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  struct AttackLog {
    uint8 attacker; // 0 for user, 1 for monster
    uint8 dealtDamage; // if 0, miss
    uint8 remainingUserHealth;
    uint8 remainingMonsterHealth;
  }

  AttackLog[] public attackLogs;
  Counters.Counter private _logIds;

  // make fight mechanic idle, monster and user autofights until one is done
  function attackMonster(uint8 _attackPower) internal returns (AttackLog[] memory, bool) {
    uint256 startIndex = _logIds.current();
    uint256 endIndex = _logIds.current();

    // monster stats
    uint8 monsterHealth = 100;
    uint8 userHealth = 100;
    uint8 monsterAttackPower = calculateMonsterAttackPower(_attackPower);
    uint8 userHitRatio = calculateHitMissRatio(_attackPower, monsterAttackPower);
    uint8 monsterHitRatio = 100 - userHitRatio;

    // normaalize their attack powers to not oneshot each other
    uint8 userNormalizedAP = normalizeAttackPower(_attackPower, monsterAttackPower);
    uint8 monsterNormalizedAP = normalizeAttackPower(monsterAttackPower, _attackPower);

    // randomly select the first attacker
    // 1 means user starts
    bool headsOrTails = headsTails();

    bool didUserWon = false;
    while (userHealth > 0 && monsterHealth > 0) {
      uint8 hitNumber = randomNumberUpTo(100);

      if (headsOrTails) {
        // user attacks
        if (hitNumber > userHitRatio) {
          // check if we make monsters health zero
          if (userNormalizedAP >= monsterHealth) {
            monsterHealth = 0;
            didUserWon = true;
          } else {
            monsterHealth = monsterHealth - userNormalizedAP;
          }

          AttackLog memory newAttackLog = AttackLog(0, userNormalizedAP, userHealth, monsterHealth);
          attackLogs.push(newAttackLog);
          _logIds.increment();
          endIndex.add(1);

          headsOrTails = !headsOrTails;
        } else {
          AttackLog memory newAttackLog = AttackLog(0, 0, userHealth, monsterHealth);
          attackLogs.push(newAttackLog);
          _logIds.increment();
          endIndex.add(1);

          headsOrTails = !headsOrTails;
        }
      } else {
        // monster attacks
        if (hitNumber > monsterHitRatio) {
          if (monsterNormalizedAP >= userHealth) {
            userHealth = 0;
          } else {
            userHealth = userHealth - monsterNormalizedAP;
          }

          AttackLog memory newAttackLog = AttackLog(1, monsterNormalizedAP, userHealth, monsterHealth);

          attackLogs.push(newAttackLog);
          _logIds.increment();
          endIndex.add(1);

          headsOrTails = !headsOrTails;
        } else {
          AttackLog memory newAttackLog = AttackLog(1, 0, userHealth, monsterHealth);
          attackLogs.push(newAttackLog);
          _logIds.increment();
          endIndex.add(1);

          headsOrTails = !headsOrTails;
        }
      }
    }

    // fill the attack log to be returned
    uint256 attackLogArrSize = endIndex.sub(startIndex);
    AttackLog[] memory attackLogArr = new AttackLog[](attackLogArrSize);
    uint256 index = 0;
    while (index < attackLogArrSize) {
      attackLogArr[index] = attackLogs[startIndex.add(index)];
      index.add(1);
    }

    return (attackLogArr, didUserWon);
  }

  function normalizeAttackPower(uint8 _firstAP, uint8 _secondAP) private pure returns (uint8) {
    return uint8(SafeMath.div(SafeMath.mul(_firstAP, 10), _secondAP));
  }

  function randomNumberUpTo(uint8 _upperLimit) private view returns (uint8) {
    // between 0 and _upperLimit
    require(_upperLimit > 0, "Upper limit should > 0");
    return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % _upperLimit);
  }

  function headsTails() private view returns (bool) {
    // 0 -> heads, 1 -> tails
    return (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 2) > 0;
  }

  function calculateMonsterAttackPower(uint8 _attackPower) private view returns (uint8) {
    bool posOrNegative = headsTails();
    uint8 monsterModifierMod = randomNumberUpTo(6);

    // monster attack power randomly bigger or smaller than user
    if (posOrNegative) {
      return _attackPower + (_attackPower % monsterModifierMod);
    } else {
      return _attackPower - (_attackPower % monsterModifierMod);
    }
  }

  function calculateHitMissRatio(uint8 _userAP, uint8 _monsterAP) private pure returns (uint8) {
    // returns hit or miss ratio for user for given monster
    return uint8(SafeMath.div(SafeMath.mul(_userAP, 100), _monsterAP));
  }
}
