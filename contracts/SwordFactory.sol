// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./GeneScience.sol";

contract SwordFactory is GeneScience {
  struct Sword {
    uint256 id;
    uint256 dna;
    uint256 attackPower;
    uint32 generation;
    uint16 winCount;
    uint16 lossCount;
  }

  function _createSword(
    uint256 _id,
    uint256 _dna,
    uint32 _generation
  ) internal pure returns (Sword memory) {
    Sword memory newSword = Sword(_id, _dna, _calculateAttackPowerFromDna(_dna), _generation, 0, 0);

    return newSword;
  }

  // create a basic sword for new comers
  function _createBasicSwordObject(uint256 _id) internal pure returns (Sword memory) {
    uint256 basicDna = _generateBasicDna();
    Sword memory newSword = _createSword(_id, basicDna, 0);
    return newSword;
  }

  function _createFromTwoSwords(
    uint256 _id,
    uint256 _swordOneDna,
    uint256 _swordTwoDna,
    uint32 _generation
  ) internal returns (Sword memory) {
    uint256 newSwordDna = _mergeSwordsDna(_swordOneDna, _swordTwoDna);
    Sword memory newSword = _createSword(_id, newSwordDna, _generation);
    return newSword;
  }

  function _createSimilarSword(uint256 _id, uint256 _swordDna) internal returns (Sword memory) {
    // create similar sword as both parents as the given sword
    uint256 newSwordDna = _mergeSwordsDna(_swordDna, _swordDna);
    // make the new sword generation 0 since it has dropped from a monster
    Sword memory newSword = _createSword(_id, newSwordDna, 0);
    return newSword;
  }

  function _generateSwordUri(uint256 _swordId, Sword memory _sword) internal view returns (string memory) {
    (uint256 hilt, uint256 swordType, uint256 swordMaterial) = _calcUriAttributes(_sword.dna);

    return
      _makeSwordUri(SwordUriProps(_swordId, _sword.attackPower, _sword.generation, hilt, swordType, swordMaterial));
  }
}
