// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./libraries/SafeMath8.sol";

import "./SwordFactory.sol";

contract SwordAttack is SwordFactory {
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  // nonce for random number
  uint256 private randNonceSwordAttack = 0;

  struct AttackLog {
    bool userStart;
    uint8 userAttackPower;
    uint8 monsterAttackPower;
    uint8 userNormalizedAP;
    uint8 monsterNormalizedAP;
    bool didUserWin;
  }

  Counters.Counter private _logIds;

  // make fight mechanic idle, monster and user autofights until one is done
  function attackMonster(uint8 _attackPower) internal view returns (AttackLog memory) {
    // monster stats
    uint8 monsterAttackPower = calculateMonsterAttackPower(_attackPower);

    // normalize their attack powers to not oneshot each other
    uint8 userNormalizedAP = normalizeAttackPower(_attackPower, monsterAttackPower);
    uint8 monsterNormalizedAP = normalizeAttackPower(monsterAttackPower, _attackPower);

    // randomly select the first attacker
    // 1 means user starts
    bool userStarts = headsTails();

    uint8 userHits = SafeMath8.div((uint8(100)),userNormalizedAP);
    uint8 monsterHits = SafeMath8.div((uint8(100)),monsterNormalizedAP);

    if (userStarts) {
      userHits = SafeMath8.sub(userHits, 1);

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
            false  // monster wins
          );
      }
    } else {
      // monster starts
      monsterHits = SafeMath8.sub(monsterHits, 1);

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
            true  // user wins
          );
      }
    }

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
      uint8 randomMod = _attackPower % monsterModifierMod; 
      if ( randomMod != _attackPower) {
        return _attackPower - randomMod; 
      } else {
        return _attackPower;
      }
    }
  }
}
