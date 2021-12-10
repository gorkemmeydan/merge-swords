// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "../interfaces/IAttackLog.sol";

library SwordAttack {
  using SafeMath for uint256;

	// make fight mechanic idle, monster and user autofights until one is done
  function attackMonster(uint8 _attackPower, uint8 _health, IAttackLog.AttackLog[] storage _attackLogArr) internal returns(IAttackLog.AttackLog[] storage) {
		// monster stats
    uint8 monsterHealth = 100;
    uint8 monsterAttackPower = calculateMonsterAttackPower(_attackPower);
		uint8 userHitRatio = calculateHitMissRatio(_attackPower, monsterAttackPower);
		uint8 monsterHitRatio = 100 - userHitRatio;	
    
		// normaalize their attack powers to not oneshot each other
		uint8 userNormalizedAP = normalizeAttackPower(_attackPower, monsterAttackPower);
		uint8 monsterNormalizedAP = normalizeAttackPower(monsterAttackPower, _attackPower);


		// randomly select the first attacker
		// 1 means user starts
		bool headsOrTails = headsTails();

		while (_health > 0 && monsterHealth > 0) {
			uint8 hitNumber = randomNumberUpTo(100);
			
			if (headsOrTails) {
				// user attacks
				if (hitNumber > userHitRatio) {
					// check if we make monsters health zero
					if (userNormalizedAP >= monsterHealth) {
						monsterHealth = 0;	
					} else {
						monsterHealth = monsterHealth - userNormalizedAP;
					}

					IAttackLog.AttackLog memory newAttackLog = IAttackLog.AttackLog(0, userNormalizedAP, _health, monsterHealth);
					_attackLogArr.push(newAttackLog);

					headsOrTails = !headsOrTails;
				} else {
					IAttackLog.AttackLog memory newAttackLog = IAttackLog.AttackLog(0, 0 , _health, monsterHealth);
					_attackLogArr.push(newAttackLog);
					headsOrTails = !headsOrTails;
				}
			}
			else {
				// monster attacks
				if (hitNumber > monsterHitRatio) {
					if (monsterNormalizedAP >= _health) {
						_health = 0;	
					} else {
						_health = _health - monsterNormalizedAP;
					}

					IAttackLog.AttackLog memory newAttackLog = IAttackLog.AttackLog(1, monsterNormalizedAP, _health, monsterHealth);
					_attackLogArr.push(newAttackLog);

					headsOrTails = !headsOrTails;
				} else {
					IAttackLog.AttackLog memory newAttackLog = IAttackLog.AttackLog(1, 0 , _health, monsterHealth);
					_attackLogArr.push(newAttackLog);
					headsOrTails = !headsOrTails;
				}
			}
		}

		return _attackLogArr;
  }

	function normalizeAttackPower(uint8 _firstAP, uint8 _secondAP) private pure returns(uint8) {
		return uint8(SafeMath.div(SafeMath.mul(_firstAP,10), _secondAP));	
	}

	function randomNumberUpTo(uint8 _upperLimit) private view returns (uint8) {
		// between 0 and _upperLimit
		require(_upperLimit > 0);
  	return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%_upperLimit);
	}

  function headsTails() private view returns (bool) {
		// 0 -> heads, 1 -> tails
  	return (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%2) > 0;
	}
  
  function calculateMonsterAttackPower(uint8 _attackPower) private view returns(uint8) { 
    bool posOrNegative = headsTails();
		uint8 monsterModifierMod = randomNumberUpTo(6);
		 
		// monster attack power randomly bigger or smaller than user
		if (posOrNegative) {
			return _attackPower + _attackPower%monsterModifierMod;
		} else {
			return _attackPower - _attackPower%monsterModifierMod;
		}
  }

	function calculateHitMissRatio(uint8 _userAP, uint8 _monsterAP) private pure returns(uint8) {
		// returns hit or miss ratio for user for given monster 
		return uint8(SafeMath.div(SafeMath.mul(_userAP, 100), _monsterAP));
	}
}