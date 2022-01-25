// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Strings.sol";

import "./libraries/Base64.sol";

contract SwordUriHelper {
  string[] private hiltColorNames = [
    "White",
    "Yellow",
    "Orange",
    "Red",
    "Purple",
    "Dark blue",
    "Blue",
    "Light blue",
    "Green",
    "Dark Green",
    "Brown",
    "Light Brown",
    "Light Grey",
    "Grey",
    "Dark Grey",
    "Black"
  ];

  string[] private swordTypeNames = ["Gladius", "Saber", "Katana", "Konda"];

  string[] private swordMaterialNames = [
    "Wood",
    "Stone",
    "Bronze",
    "Steel",
    "Gold",
    "Emerald",
    "Diamond",
    "Carbon-fibre"
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

  struct SwordUriProps {
    uint256 _swordId;
    uint256 _attackPower;
    uint32 _generation;
    uint256 _hilt;
    uint256 _swordType;
    uint256 _swordMaterial;
  }

  function _makeSwordUri(SwordUriProps memory props) internal view returns (string memory) {
    // prettier-ignore
    return Base64.encode(_makeEncodedString(props));
  }

  function _makeEncodedString(SwordUriProps memory props) private view returns (string memory) {
    return
      string(
        abi.encodePacked(
          "{'name': 'Sword #",
          Strings.toString(props._swordId),
          "',",
          "'description': 'This is an NFT that lets people play in the game Merge Swords!',",
          "'image': 'data:image/svg+xml;base64,",
          _makeImage(props._hilt, props._swordType, props._swordMaterial),
          "'",
          _makeAttributes(props._attackPower, props._generation, props._swordType, props._swordMaterial, props._hilt),
          "}"
        )
      );
  }

  function _makeImage(
    uint256 _hilt,
    uint256 _swordType,
    uint256 _swordMaterial
  ) private view returns (string memory) {
    return
      Base64.encode(
        string(
          abi.encodePacked(
            "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base{fill:",
            hiltColor[_hilt],
            ";font-family:serif;font-size:24px;paint-order:stroke;stroke:#ffffff;stroke-width:1.5px;}</style><rect width='100%' height='100%' fill='",
            swordColor[_swordMaterial],
            "' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>",
            swordTypeNames[_swordType],
            "</text></svg>"
          )
        )
      );
  }

  function _makeAttributes(
    uint256 _attackPower,
    uint32 _generation,
    uint256 _swordType,
    uint256 _swordMaterial,
    uint256 _hilt
  ) private view returns (string memory) {
    string memory attributes = string(
      abi.encodePacked(
        "'attributes': ",
        "[",
        "{ 'trait_type': 'Attack Power',   'value': '",
        Strings.toString(_attackPower),
        "'}",
        "{ 'trait_type': 'Generation',     'value' :'",
        Strings.toString(_generation),
        "'}",
        "{ 'trait_type': 'Sword Type',     'value' :'",
        swordTypeNames[_swordType],
        "'}",
        "{ 'trait_type': 'Sword Material', 'value' :'",
        swordMaterialNames[_swordMaterial],
        "'}",
        "{ 'trait_type': 'Hilt Color',     'value' :'",
        hiltColorNames[_hilt],
        "'}",
        "]"
      )
    );

    return attributes;
  }
}
