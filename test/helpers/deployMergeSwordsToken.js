const MergeSwordsToken = artifacts.require("MergeSwordsToken");

const deployMergeSwordsToken = async () => {
  const contractInstance = await MergeSwordsToken.new();

  return contractInstance;
};

module.exports = {
  deployMergeSwordsToken,
};
