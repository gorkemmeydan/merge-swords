const GladiusSvgHelper = artifacts.require("GladiusSvgHelper");
const KatanaSvgHelper = artifacts.require("KatanaSvgHelper");
const KondaSvgHelper = artifacts.require("KondaSvgHelper");
const SaberSvgHelper = artifacts.require("SaberSvgHelper");

const SwordSvgHelper = artifacts.require("SwordSvgHelper");

const MergeSwordsToken = artifacts.require("MergeSwordsToken");

const deployMergeSwordsToken = async () => {
  const gladius = await GladiusSvgHelper.new();
  const katana = await KatanaSvgHelper.new();
  const konda = await KondaSvgHelper.new();
  const saber = await SaberSvgHelper.new();

  await SwordSvgHelper.detectNetwork();
  await SwordSvgHelper.link(gladius);

  await SwordSvgHelper.detectNetwork();
  await SwordSvgHelper.link(katana);
  
  await SwordSvgHelper.detectNetwork();
  await SwordSvgHelper.link(konda);
  
  await SwordSvgHelper.detectNetwork();
  await SwordSvgHelper.link(saber);

  const svg = await SwordSvgHelper.new();  

  await MergeSwordsToken.detectNetwork();
  await MergeSwordsToken.link("SwordSvgHelper", svg.address);
  
  const contractInstance = await MergeSwordsToken.new();
  
  return contractInstance;
}

module.exports = {
  deployMergeSwordsToken
}