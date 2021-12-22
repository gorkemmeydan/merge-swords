// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./libraries/SafeMath8.sol";

import "./SwordUriHelper.sol";

// Helper library for gene computations
contract GeneScience is SwordUriHelper{
  using SafeMath for uint256;
  using SafeMath8 for uint8;

  // nonce for random number generation
  uint256 private randNonceGeneScience = 0;

  /*
		Total 12 digit for 4 genes with dominant and recessive genes
		 sword hilt color: 2 digits each, total 4 digits-> 16 colors
		 sword type: 1 digit each, total 2 digits, 4 types
		 sword material: 1 digit each, total 2 digits, 8 types
		 Base attack power: 2 digits each, total 4 digits, up to 15 ap  
 	*/
  uint256 private dnaDigits = 12;
  uint256 private dnaModulus = 10**dnaDigits;

  uint8 private dominantChance = 70;
  uint8 private recessiveChance = 30;
  uint8 private mutationChance = 10;

  function _mergeSwordsDna(uint256 _firstParentDna, uint256 _secondParentDna) internal view returns (uint256) {
    // extract genes from dna
    (
      uint16 hiltColorPair1,
      uint16 swordTypePair1,
      uint16 swordMaterialPair1,
      uint16 baseAttackPowerPair1
    ) = _extractGenePairsFromDna(_firstParentDna);

    (
      uint16 hiltColorPair2,
      uint16 swordTypePair2,
      uint16 swordMaterialPair2,
      uint16 baseAttackPowerPair2
    ) = _extractGenePairsFromDna(_secondParentDna);

    // calculate gene pairs for each trait
    uint16 newHiltColorPair = _calcGenePair(hiltColorPair1, hiltColorPair2, 4, 2);
    uint16 newSwordTypePair = _calcGenePair(swordTypePair1, swordTypePair2, 2, 1);
    uint16 newSwordMaterialPair = _calcGenePair(swordMaterialPair1, swordMaterialPair2, 3, 1);
    uint16 newBaseAttackPowerPair = _calcGenePair(baseAttackPowerPair1, baseAttackPowerPair2, 4, 2);

    // glue new genes together
    uint256 mergedDna = _glueGenePairs(
      newHiltColorPair,
      newSwordTypePair,
      newSwordMaterialPair,
      newBaseAttackPowerPair
    );
    return mergedDna;
  }

  function _glueGenePairs(
    uint16 _hiltColorPair,
    uint16 _swordTypePair,
    uint16 _swordMaterialPair,
    uint16 _baseAttackPowerPair
  ) internal pure returns (uint256) {
    uint256 newDna = 0;
    newDna.add(_baseAttackPowerPair); // 4 digits
    newDna.add(_swordMaterialPair * 10000); // 2 digits
    newDna.add(_swordTypePair * 1000000); // 2 digits
    newDna.add(_hiltColorPair * 100000000); // 4 digits

    return newDna;
  }

  function _extractGenePairsFromDna(uint256 _dna)
    internal
    pure
    returns (
      uint16,
      uint16,
      uint16,
      uint16
    )
  {
    uint256 currentDna = _dna;

    // first four digits are base attack power pair
    uint16 baseAttackPowerPair = uint16(currentDna % 10000);
    currentDna = currentDna / 10000;

    // second 2 digits are sword material pair
    uint16 swordMaterialPair = uint16(currentDna % 100);
    currentDna = currentDna / 100;

    // third 2 digits are sword type pair
    uint16 swordTypePair = uint16(currentDna % 100);
    currentDna = currentDna / 100;

    // last 4 digits are hilt color pair
    uint16 hiltColorPair = uint16(currentDna % 10000);

    return (hiltColorPair, swordTypePair, swordMaterialPair, baseAttackPowerPair);
  }

  function _calcGenePair(
    uint16 _genePair1,
    uint16 _genePair2,
    uint8 _bitSizePerGene,
    uint8 _digitPerGene
  ) internal view returns (uint16) {
    uint8 maxNum = uint8(2**_bitSizePerGene - 1);
    uint16 digitNum = uint16(10**_digitPerGene);

    // calculate each dominant and recessive gene from pair
    uint8 p1R = uint8(_genePair1 % digitNum);
    uint8 p1D = uint8(_genePair1 / digitNum);
    uint8 p2R = uint8(_genePair2 % digitNum);
    uint8 p2D = uint8(_genePair2 / digitNum);

    uint8 geneP1 = _calcGenePart(p1D, p1R, maxNum);
    uint8 geneP2 = _calcGenePart(p2D, p2R, maxNum);
    uint16 genePair = 0;

    if (_calcIfDominantIsFirstParent()) {
      genePair = geneP1 * digitNum + geneP2;
    } else {
      genePair = geneP1 + geneP2 * digitNum;
    }

    return genePair;
  }

  function _calcGenePart(
    uint8 _gene1,
    uint8 _gene2,
    uint8 _maxNumber
  ) internal view returns (uint8) {
    uint8 returnedGene = 0;
    if (_calcIfDominant()) {
      returnedGene = _gene1;
    } else {
      returnedGene = _gene2;
    }
    // check if mutation happens
    if (_calcIfMutation()) {
      returnedGene = _mutateGene(returnedGene, _maxNumber);
    }

    return returnedGene;
  }

  function _mutateGene(uint8 _gene, uint8 _maxNumber) internal pure returns (uint8) {
    // current mutation adds 1
    // if gene is at max number, go back to zero
    if (_gene == _maxNumber) {
      return 0;
    } else {
      return _gene.add(1);
    }
  }

  function _calcIfDominantIsFirstParent() private view returns (bool) {
    // 0 -> first parent , 1 -> second parent
    randNonceGeneScience.add(1);
    return (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, randNonceGeneScience))) % 2) > 0;
  }

  function _calcIfDominant() internal view returns (bool) {
    randNonceGeneScience.add(1);
    return
      (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, randNonceGeneScience))) % 100) <
      dominantChance;
  }

  function _calcIfMutation() internal view returns (bool) {
    randNonceGeneScience.add(1);
    return
      (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, randNonceGeneScience))) % 100) <
      mutationChance;
  }

  function _calculateAttackPowerFromDna(uint256 _dna) internal pure returns (uint8) {
    /*
      attack power formula:
      (swordType+1) * (baseAttackPower + 1 + swordMaterial)
      min attack power = 1 * (0 + 1 0) = 1;
      max attack power = 4 * (15 + 1 + 7) = 92;
    */
    // get dominant genes from dna

    // digits 3-4 correspond to dominant base attack power
    uint8 baseAttackPower = uint8((_dna % 10000) / 100);

    // digit 6 is the dominant sword material
    uint8 swordMaterial = uint8((_dna % 1000000) / 100000);

    // digit 8 is the dominant sword type
    uint8 swordType = uint8((_dna % 100000000) / 10000000);

    uint8 attackPower = uint8((swordType + 1) * (baseAttackPower + 1 + swordMaterial));
    return attackPower;
  }

  function _generateBasicDna() internal pure returns (uint256) {
    uint256 basicGene = 0;
    return basicGene;
  }

  function _calcUriAttributes(uint256 _dna)
    internal
    pure
    returns (
      uint8,
      uint8,
      uint8
    )
  {
    uint256 currentDna = _dna;

    // first four digits are base attack power pair, so skip
    currentDna = currentDna / 10000;

    // second 2 digits are sword material pair
    uint16 swordMaterialPair = uint16(currentDna % 100);
    uint8 dominantSwordMaterial = uint8(swordMaterialPair / 10);
    currentDna = currentDna / 100;

    // third 2 digits are sword type pair
    uint16 swordTypePair = uint16(currentDna % 100);
    uint8 dominantSwordType = uint8(swordTypePair / 10);
    currentDna = currentDna / 100;

    // last 4 digits are hilt color pair
    uint16 hiltColorPair = uint16(currentDna % 10000);
    uint8 dominantHiltColor = uint8(hiltColorPair / 100);

    return (dominantHiltColor, dominantSwordType, dominantSwordMaterial);
  }
}
