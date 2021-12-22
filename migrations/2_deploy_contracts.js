const GladiusSvgHelper = artifacts.require("GladiusSvgHelper");
const KatanaSvgHelper = artifacts.require("KatanaSvgHelper");
const KondaSvgHelper = artifacts.require("KondaSvgHelper");
const SaberSvgHelper = artifacts.require("SaberSvgHelper");

const SwordSvgHelper = artifacts.require("SwordSvgHelper");

const MergeSwordsToken = artifacts.require("MergeSwordsToken");

async function doDeploy(deployer, network) {
  await deployer.deploy(GladiusSvgHelper);
  await deployer.deploy(KatanaSvgHelper);
  await deployer.deploy(KondaSvgHelper);
  await deployer.deploy(SaberSvgHelper);

  await deployer.link(GladiusSvgHelper, SwordSvgHelper);
  await deployer.link(KatanaSvgHelper, SwordSvgHelper);
  await deployer.link(KondaSvgHelper, SwordSvgHelper);
  await deployer.link(SaberSvgHelper, SwordSvgHelper);

  await deployer.deploy(SwordSvgHelper);

  await deployer.link(SwordSvgHelper, MergeSwordsToken);

  await deployer.deploy(MergeSwordsToken);
} 

module.exports = (deployer, network) => {
  deployer.then(async () => {
    await doDeploy(deployer, network);
  });
}