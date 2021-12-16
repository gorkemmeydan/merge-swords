// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./GeneScience.sol";

contract SwordFactory is GeneScience {
  using SafeMath for uint256;

  /*
		Total 12 digit for 4 genes with dominant and recessive genes
		 sword hilt color: 2 digits each, total 4 digits-> 16 colors
		 sword type: 1 digit each, total 2 digits, 4 types
		 sword material: 1 digit each, total 2 digits, 8 types
		 attack power: 2 digits each, total 4 digits, up to 15 ap  
 	*/
  uint256 private dnaDigits = 12;
  uint256 private dnaModulus = 10**dnaDigits;
  // cooldown of each sword to be used or merged again
  uint256 private cooldownTime = 1 days;

  struct Sword {
    uint256 dna;
    uint8 attackPower;
    uint32 generation;
    uint32 readyTime;
    uint16 winCount;
    uint16 lossCount;
  }

  function _createSword(uint256 _dna, uint32 _generation) internal view returns (Sword memory) {
    Sword memory newSword = Sword(
      _dna,
      _calculateAttackPowerFromDna(_dna),
      _generation,
      uint32(block.timestamp + cooldownTime),
      0,
      0
    );

    return newSword;
  }

  // create a basic sword for new comers
  function _createBasicSwordObject() internal view returns (Sword memory) {
    uint256 basicDna = _generateBasicDna();
    Sword memory newSword = _createSword(basicDna, 0);
    return newSword;
  }

  function _createFromTwoSwords(
    uint256 _swordOneDna,
    uint256 _swordTwoDna,
    uint32 _generation
  ) internal view returns (Sword memory) {
    uint256 newSwordDna = _mergeSwordsDna(_swordOneDna, _swordTwoDna);
    Sword memory newSword = _createSword(newSwordDna, _generation);
    return newSword;
  }

  function _createSimilarSword(uint256 _swordDna) internal view returns (Sword memory) {
    // create similar sword as both parents as the given sword
    uint256 newSwordDna = _mergeSwordsDna(_swordDna, _swordDna);
    // make the new sword generation 0 since it has dropped from a monster
    Sword memory newSword = _createSword(newSwordDna, 0);
    return newSword;
  }
}
