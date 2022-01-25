import assembleSwordSvg from "../../utils/assembleSvg.utils";

const hiltColorNames = [
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
  "Black",
];

const swordTypeNames = ["Gladius", "Saber", "Katana", "Konda"];

const swordMaterialNames = ["Wood", "Stone", "Bronze", "Steel", "Gold", "Emerald", "Diamond", "Carbon-fibre"];

const extractDnaInformation = (dna) => {
  // first 4 digits are base attack power, skip it
  let currentDna = ~~(dna / 10000);

  // second 2 digits are sword material pair
  const swordMaterialPair = currentDna % 100;
  const swordMaterial = ~~(swordMaterialPair / 10);
  currentDna = ~~(currentDna / 100);

  // third 2 digits are sword type pair
  const swordTypePair = currentDna % 100;
  const swordType = ~~(swordTypePair / 10);
  currentDna = ~~(currentDna / 100);

  // last 4 digits are hilt color pair
  const hiltColorPair = currentDna % 10000;
  const hiltColor = ~~(hiltColorPair / 100);

  return { hiltColor, swordType, swordMaterial };
};

const convertItemsToGameFormat = (items) => {
  let convertedItems = [];

  items.forEach((item) => {
    const { hiltColor, swordType, swordMaterial } = extractDnaInformation(parseInt(item.dna));
    const props = { hiltColor, swordType, swordMaterial };
    const art = assembleSwordSvg(props);
    const id = item.id;
    const swordName = makeSwordName(swordMaterial, swordType, id);
    // console.log("sword id:", id, " type:", swordType, " material:", swordMaterial);

    const temp = {
      id: item.id,
      attackPower: item.attackPower,
      dna: item.dna,
      generation: item.generation,
      lossCount: item.lossCount,
      winCount: item.winCount,
      name: swordName,
      artwork: art,
      swordType: swordTypeNames[swordType],
      swordMaterial: swordMaterialNames[swordMaterial],
      hiltColor: hiltColorNames[hiltColor],
    };
    convertedItems.push(temp);
  });

  return convertedItems;
};

const makeSwordName = (swordMaterial, swordType, id) => {
  return swordMaterialNames[swordMaterial] + " " + swordTypeNames[swordType] + " #" + id;
};

export default convertItemsToGameFormat;
