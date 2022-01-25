// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./SwordUriHelper.sol";

// Helper library for gene computations
contract GeneScience is SwordUriHelper {
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
  uint8 private mutationChance = 50;

  function _mergeSwordsDna(uint256 _firstParentDna, uint256 _secondParentDna) internal returns (uint256) {
    // extract genes from dna
    (
      uint256 hiltColorPair1,
      uint256 swordTypePair1,
      uint256 swordMaterialPair1,
      uint256 baseAttackPowerPair1
    ) = _extractGenePairsFromDna(_firstParentDna);

    (
      uint256 hiltColorPair2,
      uint256 swordTypePair2,
      uint256 swordMaterialPair2,
      uint256 baseAttackPowerPair2
    ) = _extractGenePairsFromDna(_secondParentDna);

    // calculate gene pairs for each trait
    uint256 newHiltColorPair = _calcGenePair(hiltColorPair1, hiltColorPair2, 4, 2);
    uint256 newSwordTypePair = _calcGenePair(swordTypePair1, swordTypePair2, 2, 1);
    uint256 newSwordMaterialPair = _calcGenePair(swordMaterialPair1, swordMaterialPair2, 3, 1);
    uint256 newBaseAttackPowerPair = _calcGenePair(baseAttackPowerPair1, baseAttackPowerPair2, 4, 2);

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
    uint256 _hiltColorPair,
    uint256 _swordTypePair,
    uint256 _swordMaterialPair,
    uint256 _baseAttackPowerPair
  ) internal pure returns (uint256) {
    uint256 newDna = 0;
    newDna = newDna + _baseAttackPowerPair; // 4 digits
    newDna = newDna + (_swordMaterialPair * 10000); // 2 digits
    newDna = newDna + (_swordTypePair * 1000000); // 2 digits
    newDna = newDna + (_hiltColorPair * 100000000); // 4 digits

    return newDna;
  }

  function _extractGenePairsFromDna(uint256 _dna)
    internal
    pure
    returns (
      uint256,
      uint256,
      uint256,
      uint256
    )
  {
    uint256 currentDna = _dna;

    // first four digits are base attack power pair
    uint256 baseAttackPowerPair = currentDna % 10000;
    currentDna = currentDna / 10000;

    // second 2 digits are sword material pair
    uint256 swordMaterialPair = currentDna % 100;
    currentDna = currentDna / 100;

    // third 2 digits are sword type pair
    uint256 swordTypePair = currentDna % 100;
    currentDna = currentDna / 100;

    // last 4 digits are hilt color pair
    uint256 hiltColorPair = currentDna % 10000;

    return (hiltColorPair, swordTypePair, swordMaterialPair, baseAttackPowerPair);
  }

  function _calcGenePair(
    uint256 _genePair1,
    uint256 _genePair2,
    uint256 _bitSizePerGene,
    uint256 _digitPerGene
  ) internal returns (uint256) {
    uint256 maxNum = 2**_bitSizePerGene - 1;
    uint256 digitNum = 10**_digitPerGene;

    // calculate each dominant and recessive gene from pair
    uint256 p1R = _genePair1 % digitNum;
    uint256 p1D = _genePair1 / digitNum;
    uint256 p2R = _genePair2 % digitNum;
    uint256 p2D = _genePair2 / digitNum;

    uint256 geneP1 = _calcGenePart(p1D, p1R, maxNum);
    uint256 geneP2 = _calcGenePart(p2D, p2R, maxNum);
    uint256 genePair = 0;

    if (_calcIfDominantIsFirstParent()) {
      genePair = geneP1 * digitNum + geneP2;
    } else {
      genePair = geneP1 + geneP2 * digitNum;
    }

    return genePair;
  }

  function _calcGenePart(
    uint256 _gene1,
    uint256 _gene2,
    uint256 _maxNumber
  ) internal returns (uint256) {
    uint256 returnedGene = 0;
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

  function _mutateGene(uint256 _gene, uint256 _maxNumber) internal pure returns (uint256) {
    // current mutation adds 1
    // if gene is at max number, go back to zero
    if (_gene == _maxNumber) {
      return 0;
    } else {
      return (_gene + 1);
    }
  }

  function _calcIfDominantIsFirstParent() private returns (bool) {
    // 0 -> first parent , 1 -> second parent
    randNonceGeneScience = randNonceGeneScience + 1;
    return (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, randNonceGeneScience))) % 2) > 0;
  }

  function _calcIfDominant() internal returns (bool) {
    randNonceGeneScience = randNonceGeneScience + 1;
    return
      (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, randNonceGeneScience))) % 100) <
      dominantChance;
  }

  function _calcIfMutation() internal returns (bool) {
    randNonceGeneScience = randNonceGeneScience + 1;
    return
      (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, randNonceGeneScience))) % 100) <
      mutationChance;
  }

  function _calculateAttackPowerFromDna(uint256 _dna) internal pure returns (uint256) {
    /*
      attack power formula:
      (swordType+1) * (baseAttackPower + 1 + swordMaterial)
      min attack power = 1 * (0 + 1 0) = 1;
      max attack power = 4 * (15 + 1 + 7) = 92;
    */
    // get dominant genes from dna

    // digits 3-4 correspond to dominant base attack power
    uint256 baseAttackPower = (_dna % 10000) / 100;

    // digit 6 is the dominant sword material
    uint256 swordMaterial = (_dna % 1000000) / 100000;

    // digit 8 is the dominant sword type
    uint256 swordType = (_dna % 100000000) / 10000000;

    uint256 attackPower = (swordType + 1) * (baseAttackPower + 1 + swordMaterial);
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
      uint256,
      uint256,
      uint256
    )
  {
    uint256 currentDna = _dna;

    // first four digits are base attack power pair, so skip
    currentDna = currentDna / 10000;

    // second 2 digits are sword material pair
    uint256 swordMaterialPair = currentDna % 100;
    uint256 dominantSwordMaterial = swordMaterialPair / 10;
    currentDna = currentDna / 100;

    // third 2 digits are sword type pair
    uint256 swordTypePair = currentDna % 100;
    uint256 dominantSwordType = swordTypePair / 10;
    currentDna = currentDna / 100;

    // last 4 digits are hilt color pair
    uint256 hiltColorPair = currentDna % 10000;
    uint256 dominantHiltColor = hiltColorPair / 100;

    return (dominantHiltColor, dominantSwordType, dominantSwordMaterial);
  }
}
