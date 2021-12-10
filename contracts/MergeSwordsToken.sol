// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./SwordFactory.sol"; 

contract MergeSwordsToken is ERC721, SwordFactory {
	constructor() 
		ERC721("MERGESWORDS", "MSWRD") {}
	
	// TODO: add fee

	
}