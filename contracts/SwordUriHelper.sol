// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Strings.sol";

import "./libraries/Base64.sol";

import "./libraries/SwordSvgHelper.sol";

contract SwordUriHelper  {
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

  string[] private hiltColor = [
    "#ffffff",
    "#ffff02",
    "#ff6600",
    "#ff0000",
    "#ff00ff",
    "#000080",
    "#0000ff",
    "#00ffff",
    "#00ff00",
    "#008000",
    "#803300",
    "#d45500",
    "#916f6f",
    "#6c5353",
    "#483737",
    "#241c1c"
  ];

  string[] private swordColor = [
    "#803300",
    "#ac9393",
    "#ff6600",
    "#6c5353",
    "#ffcc00",
    "#008000",
    "#00ffff",
    "#241c1c"
  ];

  function _makeSwordUri(
    uint256 _swordId,
    uint8 _attackPower,
    uint32 _generation,
    uint8 _hilt,
    uint8 _swordType,
    uint8 _swordMaterial
  ) internal view returns (string memory) {
    // prettier-ignore
    return Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            "{",
            "'name': 'Sword #", Strings.toString(_swordId), "'",
            ",",
            "'description': 'This is an NFT that lets people play in the game Merge Swords!'",
            ",",
            "'image': 'data:image/svg+xml;base64,", Base64.encode(bytes(SwordSvgHelper._assembleSvg(hiltColor[_hilt], _swordType, swordColor[_swordMaterial]))), "'",
            _makeAttributes(_attackPower, _generation, _swordType, _swordMaterial, _hilt),
            "}"
          )
        )
      )
    );
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
