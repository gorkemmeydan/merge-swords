import Web3 from "web3";
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
  // first 4 digits are base attack power
  let currentDna = dna;
  const baseAttackPowerPair = currentDna % 10000;
  const baseAttackPower = ~~(baseAttackPowerPair / 100);
  currentDna = ~~(currentDna / 10000);

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

  const attackPower = (swordType + 1) * (baseAttackPower + 1 + swordMaterial);

  return { attackPower, hiltColor, swordType, swordMaterial };
};

const convertItemsToMarketFormat = (items) => {
  let convertedItems = [];

  items.forEach((item) => {
    const { attackPower, hiltColor, swordType, swordMaterial } = extractDnaInformation(parseInt(item.dna));
    const props = { hiltColor, swordType, swordMaterial };
    const art = assembleSwordSvg(props);
    const id = item.tokenId;
    const swordName = makeSwordName(swordMaterial, swordType, id);
    const price = Web3.utils.fromWei(item.price, "ether");

    const temp = {
      price: price,
      seller: item.seller,
      marketId: item.itemId,
      id: item.tokenId,
      attackPower: attackPower,
      dna: item.dna,
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

export default convertItemsToMarketFormat;
