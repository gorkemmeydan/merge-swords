// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;

  mapping(uint256 => MarketItem) private idToMarketItem;

  struct MarketItem {
    uint256 itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  event MarketItemCreated(
    uint256 indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

  // Places an item for sale on the marketplace
  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price,
    address sender
  ) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei");
    require(nftContract == address(this), "Only game items");

    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    idToMarketItem[itemId] = MarketItem(
      itemId,
      nftContract,
      tokenId,
      payable(sender),
      payable(address(0)),
      price,
      false
    );

    IERC721(nftContract).transferFrom(sender, address(this), tokenId);

    emit MarketItemCreated(itemId, nftContract, tokenId, sender, address(0), price, false);
  }

  function withdrawMarketItem(
    address nftContract,
    uint256 itemId,
    address sender
  ) public nonReentrant {
    require(nftContract == address(this), "Only game items");
    require(sender == idToMarketItem[itemId].seller, "Only owner");

    // make it like sold for free back
    idToMarketItem[itemId].sold = true;
    idToMarketItem[itemId].seller = payable(address(0)); // remove from sold items
    uint256 tokenId = idToMarketItem[itemId].tokenId;
    IERC721(nftContract).transferFrom(address(this), sender, tokenId);
    _itemsSold.increment();
  }

  // Creates the sale of a marketplace item
  // Transfers ownership of the item, as well as funds between parties
  function createMarketSale(
    address nftContract,
    uint256 itemId,
    uint256 value,
    address sender
  ) public payable nonReentrant {
    uint256 price = idToMarketItem[itemId].price;
    uint256 tokenId = idToMarketItem[itemId].tokenId;
    require(value == price, "Asking price is not equal");
    require(nftContract == address(this), "Only game items");

    idToMarketItem[itemId].owner = payable(sender);
    idToMarketItem[itemId].sold = true;
    idToMarketItem[itemId].seller.transfer(value);
    IERC721(nftContract).transferFrom(address(this), sender, tokenId);

    _itemsSold.increment();
  }

  // Returns all unsold market items
  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint256 itemCount = _itemIds.current();
    uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
    uint256 currentIndex = 0;

    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for (uint256 i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].owner == address(0)) {
        uint256 currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  // Returns only items that a user has purchased
  function fetchMyNFTs() public view returns (MarketItem[] memory) {
    uint256 totalItemCount = _itemIds.current();
    uint256 itemCount = 0;
    uint256 currentIndex = 0;

    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        uint256 currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  // Returns only items a user has created
  function fetchItemsCreated() public view returns (MarketItem[] memory) {
    uint256 totalItemCount = _itemIds.current();
    uint256 itemCount = 0;
    uint256 currentIndex = 0;

    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        uint256 currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
}
