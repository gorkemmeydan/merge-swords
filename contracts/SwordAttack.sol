// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./SwordFactory.sol";

contract SwordAttack is SwordFactory {
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  // nonce for random number
  uint256 private randNonceSwordAttack = 0;

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

    // normalize their attack powers to not oneshot each other
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

          addToAttackLog(0, userNormalizedAP, userHealth, monsterHealth);
          endIndex.add(1);

          headsOrTails = !headsOrTails;
        } else {
          addToAttackLog(0, 0, userHealth, monsterHealth);
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

          addToAttackLog(1, monsterNormalizedAP, userHealth, monsterHealth);
          endIndex.add(1);

          headsOrTails = !headsOrTails;
        } else {
          addToAttackLog(1, 0, userHealth, monsterHealth);
          endIndex.add(1);

          headsOrTails = !headsOrTails;
        }
      }
    }

    AttackLog[] memory attackLogArr = generateLocalAttackLog(startIndex, endIndex);

    return (attackLogArr, didUserWon);
  }

  function generateLocalAttackLog(uint256 _start, uint256 _end) private view returns (AttackLog[] memory) {
    // fill the attack log to be returned
    uint256 attackLogArrSize = _end.sub(_start);
    AttackLog[] memory attackLogArr = new AttackLog[](attackLogArrSize);
    uint256 index = 0;
    while (index < attackLogArrSize) {
      attackLogArr[index] = attackLogs[_start.add(index)];
      index.add(1);
    }

    return attackLogArr;
  }

  function addToAttackLog(
    uint8 _attacker,
    uint8 _dealtDamage,
    uint8 _remainingUserHealth,
    uint8 _remainingMonsterHealth
  ) private {
    AttackLog memory newAttackLog = AttackLog(_attacker, _dealtDamage, _remainingUserHealth, _remainingMonsterHealth);

    attackLogs.push(newAttackLog);
    _logIds.increment();
  }

  function normalizeAttackPower(uint8 _firstAP, uint8 _secondAP) private pure returns (uint8) {
    return uint8(SafeMath.div(SafeMath.mul(_firstAP, 10), _secondAP));
  }

  function randomNumberUpTo(uint8 _upperLimit) private view returns (uint8) {
    // between 0 and _upperLimit
    require(_upperLimit > 0, "Upper limit should > 0");
    randNonceSwordAttack.add(1);
    return
      uint8(
        uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, randNonceSwordAttack))) % _upperLimit
      );
  }

  function headsTails() private view returns (bool) {
    // 0 -> heads, 1 -> tails
    randNonceSwordAttack.add(1);
    return (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, randNonceSwordAttack))) % 2) > 0;
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
