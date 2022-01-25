import { makeGladius } from "./sword-parts/gladius";
import { makeHilt } from "./sword-parts/hilt";
import { makeKatana } from "./sword-parts/katana";
import { makeKonda } from "./sword-parts/konda";
import { makeSaber } from "./sword-parts/saber";

const hiltColors = [
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
  "#241c1c",
];

const swordColors = ["#803300", "#ac9393", "#ff6600", "#6c5353", "#ffcc00", "#008000", "#00ffff", "#241c1c"];

const assembleSwordSvg = (props) => {
  const swordProps = { swordType: props.swordType, swordMaterial: props.swordMaterial };

  return (
    "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
    makeHilt(hiltColors[props.hiltColor]) +
    makeSword(swordProps) +
    "</svg>"
  );
};

const makeSword = (props) => {
  if (props.swordType == 3) {
    return makeKonda(swordColors[props.swordMaterial]);
  } else if (props.swordType == 2) {
    return makeKatana(swordColors[props.swordMaterial]);
  } else if (props.swordType == 1) {
    return makeSaber(swordColors[props.swordMaterial]);
  } else {
    return makeGladius(swordColors[props.swordMaterial]);
  }
};

export default assembleSwordSvg;
