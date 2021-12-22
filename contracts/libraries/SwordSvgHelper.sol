// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GladiusSvgHelper.sol";
import "./SaberSvgHelper.sol";
import "./KatanaSvgHelper.sol";
import "./KondaSvgHelper.sol";

// prettier-ignore
library SwordSvgHelper {
  function _assembleSvg(
    string memory _hilt,
    uint8 _swordType,
    string memory _swordMaterial
  ) public pure returns (string memory) {
    return 
      string(
        abi.encodePacked(
          "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>",
          _makeHiltSvg(_hilt),
          _makeSwordSvg(_swordType, _swordMaterial),
          "</svg>"
        )
      );
  }

  function _makeHiltSvg(string memory _hilt) public pure returns (string memory) {
    return 
      string(
        abi.encodePacked(
          "<svg viewBox='0 0 52.916666 52.916668'>",
          "<g>",
          "<path",
          "style='display:inline;fill:#000001;stroke-width:0.264583'",
          "d='m 17.197916,47.625 h 1.322917 v 1.322917 h -1.322917 z m 0,-1.322918 h 1.322917 v 1.322917 H 17.197916 Z M 3.9687495,34.395832 h 1.3229167 v 1.322917 H 3.9687495 Z M 15.875,47.625 h 1.322917 v 1.322917 H 15.875 Z m -1.322917,0 H 15.875 v 1.322917 H 14.552083 Z M 15.875,44.979168 h 1.322917 v 1.322917 H 15.875 Z M 14.552083,43.65625 H 15.875 v 1.322917 h -1.322917 z m -1.322916,-1.322918 h 1.322917 v 1.322917 H 13.229167 Z M 11.90625,41.010418 h 1.322917 v 1.322917 H 11.90625 Z M 10.583333,39.6875 h 1.322917 v 1.322917 H 10.583333 Z M 9.260416,38.364582 h 1.322917 v 1.322917 H 9.260416 Z M 7.9374995,37.041668 h 1.3229167 v 1.322917 H 7.9374995 Z M 6.614583,35.71875 h 1.3229166 v 1.322917 H 6.614583 Z M 5.2916665,34.395832 h 1.3229166 v 1.322917 H 5.2916665 Z m -1.322917,1.322918 h 1.3229167 v 1.322917 H 3.9687495 Z m 0,1.322918 h 1.3229167 v 1.322917 H 3.9687495 Z m 9.2604175,9.260414 h 1.322917 v 1.322917 H 13.229167 Z M 11.90625,44.979168 h 1.322917 v 1.322917 H 11.90625 Z M 5.2916665,38.364582 h 1.3229166 v 1.322917 H 5.2916665 Z M 6.614583,39.6875 h 1.3229166 v 1.322917 H 6.614583 Z m 3.96875,3.96875 h 1.322917 v 1.322917 H 10.583333 Z M 7.9374995,41.010418 h 1.3229167 v 1.322917 H 7.9374995 Z m -1.322916,1.322914 h 1.3229166 v 1.322917 H 6.6145835 Z m 2.6458335,2.645836 h 1.322917 v 1.322917 H 9.260417 Z M 7.9375,46.302082 h 1.3229166 v 1.322917 H 7.9375 Z M 6.6145835,47.625 h 1.3229166 v 1.322917 H 6.6145835 Z m -1.322917,-3.96875 h 1.3229166 v 1.322917 H 5.2916665 Z M 3.96875,44.979168 h 1.3229166 v 1.322917 H 3.96875 Z m -1.3229167,1.322914 h 1.3229166 v 1.322917 H 2.6458333 Z m 2.6458332,2.645836 h 1.3229166 v 1.322917 H 5.2916665 Z m -1.3229165,0 h 1.3229166 v 1.322917 H 3.96875 Z M 2.6458333,47.625 h 1.3229166 v 1.322917 H 2.6458333 Z m 0,1.322918 h 1.3229166 v 1.322917 H 2.6458333 Z' />",
          "<path",
          "style='fill:",
          _hilt,
          ";stroke-width:0.197696'",
          "d='m 15.02488,180.00201 v -4.94239 h 2.570045 2.570045 v -2.4712 -2.4712 h 2.471197 2.471198 v -2.47119 -2.4712 h 2.471197 2.471197 v -2.57005 -2.57004 h 2.570045 2.570046 v -2.57005 -2.57004 h -2.570046 -2.570045 v -2.4712 -2.4712 h -2.471197 -2.471197 v -2.57004 -2.57005 H 22.636167 20.16497 v -4.84354 -4.84355 h 2.372349 2.37235 v 2.4712 2.47119 h 2.471197 2.471197 v 2.4712 2.4712 h 2.570046 2.570045 v 2.57004 2.57005 h 2.471197 2.471197 v 2.4712 2.47119 h 2.471198 2.471197 v 2.4712 2.4712 h 2.471197 2.471198 v 2.57004 2.57005 h 2.570045 2.570045 v 2.4712 2.47119 h 2.471197 2.471198 v 2.4712 2.4712 h 2.471197 2.471197 v 2.37235 2.37235 h -4.843546 -4.843547 v -2.4712 -2.4712 h -2.570045 -2.570046 v -2.4712 -2.47119 h -2.471197 -2.471197 v -2.4712 -2.4712 h -2.570045 -2.570046 v 2.4712 2.4712 h -2.471197 -2.471197 v 2.47119 2.4712 h -2.570045 -2.570046 v 2.46511 2.46512 l -2.421773,0.0555 -2.421773,0.0555 -0.05533,2.52063 -0.05533,2.52062 H 19.961368 15.02488 Z'",
          "transform='scale(0.26458333)' />",
          "</g>",
          "</svg>"
        )
      );
  }

  function _makeSwordSvg(uint8 _swordType, string memory _swordMaterial) public pure returns (string memory) {
    if (_swordType == 3) {
      return KondaSvgHelper.makeKonda(_swordMaterial);
    } else if (_swordType == 2) {
      return KatanaSvgHelper.makeKatana(_swordMaterial);
    } else if (_swordType == 1) {
      return SaberSvgHelper.makeSaber(_swordMaterial);     
    } else {
      return GladiusSvgHelper.makeGladius(_swordMaterial);
    }
  }
}