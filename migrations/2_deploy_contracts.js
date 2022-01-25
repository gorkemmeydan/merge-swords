const MergeSwordsToken = artifacts.require("MergeSwordsToken");

async function doDeploy(deployer, network) {
  await deployer.deploy(MergeSwordsToken);
}

module.exports = (deployer, network) => {
  deployer.then(async () => {
    await doDeploy(deployer, network);
  });
};
