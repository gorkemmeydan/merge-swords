// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Strings.sol";

import "./libraries/Base64.sol";

import "./SwordSvgFactory.sol";

contract SwordUriHelper is SwordSvgFactory {
  string[] private hiltColorNames = [
    "white",
    "yellow",
    "orange",
    "red",
    "purple",
    "dark blue",
    "blue",
    "light blue",
    "green",
    "dark green",
    "brown",
    "light brown",
    "light grey",
    "grey",
    "dark grey",
    "black"
  ];

  string[] private swordTypeNames = ["gladius", "saber", "katana", "konda"];

  string[] private swordMaterialNames = [
    "wood",
    "stone",
    "bronze",
    "steel",
    "gold",
    "emerald",
    "diamond",
    "carbon-fibre"
  ];

  function _makeSwordUri(
    uint256 _swordId,
    uint8 _attackPower,
    uint32 _generation,
    uint8 _hilt,
    uint8 _swordType,
    uint8 _swordMaterial
  ) internal view returns (string memory) {
    string memory finalSvg = _assembleSvg(_hilt, _swordType, _swordMaterial);

    // prettier-ignore
    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            "{",
            "'name': 'Sword #", Strings.toString(_swordId), "'",
            ",",
            "'description': 'This is an NFT that lets people play in the game Merge Swords!'",
            ",",
            "'image': 'data:image/svg+xml;base64,", Base64.encode(bytes(finalSvg)), "'",
            _makeAttributes(_attackPower, _generation, _swordType, _swordMaterial, _hilt),
            "}"
          )
        )
      )
    );

    return json;
  }

  function _makeAttributes(
    uint8 _attackPower,
    uint32 _generation,
    uint8 _swordType,
    uint8 _swordMaterial,
    uint8 _hilt) private view returns(string memory) {
      string memory attributes = 
        string(
          abi.encodePacked(
            "'attributes': ",
              "[",
                "{ 'trait_type': 'Attack Power',   'value': '", Strings.toString(_attackPower), "'}",
                "{ 'trait_type': 'Generation',     'value' :'", Strings.toString(_generation) , "'}",
                "{ 'trait_type': 'Sword Type',     'value' :'", swordTypeNames[_swordType] , "'}",
                "{ 'trait_type': 'Sword Material', 'value' :'", swordMaterialNames[_swordMaterial] , "'}",
                "{ 'trait_type': 'Generation',     'value' :'", hiltColorNames[_hilt] , "'}",
              "]"
          )
        );

      return attributes;
    }
}
