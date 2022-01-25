// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./SwordAttack.sol";
import "./NFTMarketplace.sol";

contract MergeSwordsToken is ERC721URIStorage, NFTMarketplace, Ownable, SwordAttack {
  constructor() ERC721("MERGESWORDS", "SWORD") {}

  using Counters for Counters.Counter;

  uint256 private basicSwordFee = 0.01 ether;
  uint256 private mergeFee = 0.005 ether;
  uint256 private attackFee = 0.001 ether;

  event NewSword(address indexed owner, uint256 id);
  event BurnSword(address indexed owner, uint256 id);
  event WonBattle(address indexed owner, AttackLog attackLog);
  event LostBattle(address indexed owner, AttackLog attackLog);

  Counters.Counter private _tokenIds;

  // stored swords on blockhain
  Sword[] public swords;

  mapping(uint256 => address) public swordToOwner;
  mapping(address => uint256) public ownerSwordCount;
  mapping(uint256 => Sword) public idToSword;

  modifier doesNotOwnSword() {
    require(ownerSwordCount[msg.sender] == 0, "Should not own any sword");
    _;
  }

  modifier onlySwordOwner(uint256 _swordId, address _callerAddress) {
    require(ownerOf(_swordId) == _callerAddress, "Only sword owner can call");
    _;
  }

  function updateBasicSwordFee(uint256 _fee) external onlyOwner {
    basicSwordFee = _fee;
  }

  function updateMergeFee(uint256 _fee) external onlyOwner {
    mergeFee = _fee;
  }

  function updateAttackFee(uint256 _fee) external onlyOwner {
    attackFee = _fee;
  }

  function getBasicSword() public payable doesNotOwnSword {
    require(msg.value == basicSwordFee, "Not enough fee");

    Sword memory newSword = _createBasicSwordObject(_tokenIds.current());

    _mintSwordFromObject(newSword, msg.sender);
  }

  function _mintSwordFromObject(Sword memory _newSword, address _senderAddr) internal {
    swords.push(_newSword);

    _safeMint(_senderAddr, _tokenIds.current());

    // set token uri
    _setTokenURI(_tokenIds.current(), _generateSwordUri(_tokenIds.current(), _newSword));

    swordToOwner[_tokenIds.current()] = _senderAddr;
    ownerSwordCount[_senderAddr] = ownerSwordCount[_senderAddr] + 1;
    idToSword[_tokenIds.current()] = _newSword;

    emit NewSword(_senderAddr, _tokenIds.current());

    _tokenIds.increment();
  }

  function mergeSwords(uint256 swordOneId, uint256 swordTwoId)
    public
    payable
    onlySwordOwner(swordOneId, msg.sender)
    onlySwordOwner(swordTwoId, msg.sender)
  {
    require(msg.value == mergeFee, "Not enough fee");
    require(swordOneId != swordTwoId, "Swords must be different");

    // create a new sword
    Sword memory newSword = _createFromTwoSwords(
      _tokenIds.current(),
      _getSwordDnaFromId(swordOneId),
      _getSwordDnaFromId(swordTwoId),
      _calcChildGeneration(swordOneId, swordTwoId)
    );
    _mintSwordFromObject(newSword, msg.sender);

    // burn the given sword NFTs
    _burnSwordNft(swordOneId, msg.sender);
    _burnSwordNft(swordTwoId, msg.sender);
  }

  function _burnSwordNft(uint256 _swordId, address _senderAddr) internal {
    swordToOwner[_swordId] = address(0);
    ownerSwordCount[_senderAddr] = ownerSwordCount[_senderAddr] - 1;

    _burn(_swordId);

    emit BurnSword(_senderAddr, _swordId);
  }

  function _getSwordDnaFromId(uint256 _swordId) internal view returns (uint256) {
    Sword memory sword = idToSword[_swordId];
    return sword.dna;
  }

  function _calcChildGeneration(uint256 _parentOneId, uint256 _parentTwoId) internal view returns (uint32) {
    Sword memory parentOne = idToSword[_parentOneId];
    Sword memory parentTwo = idToSword[_parentTwoId];

    // select the oldest parent
    if (parentOne.generation >= parentTwo.generation) {
      return (parentOne.generation + 1);
    } else {
      return (parentTwo.generation + 1);
    }
  }

  function battleMonster(uint256 _swordId) public payable onlySwordOwner(_swordId, msg.sender) {
    require(msg.value == attackFee, "Not enough fee");
    AttackLog memory attackLog = attackMonster(_getAttackPowerFromSwordId(_swordId));

    if (attackLog.didUserWin) {
      emit WonBattle(msg.sender, attackLog);

      // give a new sword as a reward to user
      Sword memory sword = _createSimilarSword(_tokenIds.current(), _getSwordDnaFromId(_swordId));
      _mintSwordFromObject(sword, msg.sender);
    } else {
      emit LostBattle(msg.sender, attackLog);
    }
  }

  // for deleting unneccessary items
  function sendSwordToTrash(uint256 _swordId) public onlySwordOwner(_swordId, msg.sender) {
    _burnSwordNft(_swordId, msg.sender);
  }

  // direct item transfer between parts
  function transferToAdress(uint256 _swordId, address _to) public onlySwordOwner(_swordId, msg.sender) {
    transferFrom(msg.sender, _to, _swordId);
  }

  // the one finishes the game can claim prize
  function claimPrize(uint256 _swordId) public onlySwordOwner(_swordId, msg.sender) {
    uint256 attackPower = _getAttackPowerFromSwordId(_swordId);
    // check if reached max level
    if (attackPower == 92) {
      _burnSwordNft(_swordId, msg.sender);
      payable(msg.sender).transfer(address(this).balance);
    }
  }

  function _getAttackPowerFromSwordId(uint256 _swordId) internal view returns (uint256) {
    Sword memory sword = idToSword[_swordId];
    return sword.attackPower;
  }

  // getters
  function getUserSwordCount(address _user) public view returns (uint256) {
    return ownerSwordCount[_user];
  }

  function getUserSwords(address _user) public view returns (Sword[] memory) {
    Sword[] memory userSwords = new Sword[](ownerSwordCount[_user]);
    uint256 counter;
    for (uint256 i = 0; i < swords.length; i++) {
      if (swordToOwner[i] == _user) {
        userSwords[counter] = swords[i];
        counter++;
      }
    }
    return userSwords;
  }

  function getSwordFromId(uint256 _id) public view returns (Sword memory) {
    require(_id < _tokenIds.current(), "Sword does not exist");
    return idToSword[_id];
  }
}
