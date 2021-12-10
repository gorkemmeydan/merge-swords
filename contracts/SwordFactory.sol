// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./libraries/GeneScience.sol";

contract SwordFactory is Ownable {
  using SafeMath for uint256;

	// The tokenId is the NFTs unique identifier, it's just a number that goes
  // 0, 1, 2, 3, etc.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

	// event for new sword creation 
	event NewSword(uint swordId, uint dna);

	/*
		Total 12 digit for 4 genes with dominant and recessive genes
		 sword hilt color: 2 digits each, total 4 digits-> 16 colors
		 sword type: 1 digit each, total 2 digits, 4 types
		 sword material: 1 digit each, total 2 digits, 8 types
		 attack power: 2 digits each, total 4 digits, up to 15 ap  
 	*/ 
	uint dnaDigits = 12;
  uint dnaModulus = 10 ** dnaDigits;
	// cooldown of each sword to be used or merged again 
  uint cooldownTime = 1 days;	

	struct Sword {
    uint dna;
		uint attackPower;
    uint32 generation;
    uint32 readyTime;
    uint16 winCount;
    uint16 lossCount;
  }

	// stored swords on blockhain
	Sword[] public swords;

	mapping (uint => address) public swordToOwner;
  mapping (address => uint) ownerSwordCount;

	function _createSword(uint _dna, uint32 _generation) internal {
    swords.push(
			Sword(
				_dna,
				GeneScience.calculateAttackPowerFromDna(_dna),
				_generation,
				uint32(block.timestamp + cooldownTime),
				0, 0));
		
		_tokenIds.increment();
    swordToOwner[_tokenIds.current()] = msg.sender;
    ownerSwordCount[msg.sender] = ownerSwordCount[msg.sender].add(1);
    emit NewSword(_tokenIds.current(), _dna);
  }

	// create a basic sword for new comers 
	function createBasicSword() public {
    require(ownerSwordCount[msg.sender] == 0);
    uint basicDna = GeneScience.generateBasicDna(); 
    _createSword(basicDna, 0);
  }
}
