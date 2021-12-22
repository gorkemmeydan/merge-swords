const deployToken = require("./helpers/deployMergeSwordsToken");

const utils = require("./helpers/utils");

const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

var expect = require('chai').expect;

contract("MergeSwordsToken", (accounts) => {
  let [alice,bob] = accounts;
  let contractInstance;

  beforeEach(async () => {
    contractInstance = await deployToken.deployMergeSwordsToken();
  })

  xit("should be able to create a new sword", async () => {
    const result = await contractInstance.getBasicSword({from: alice, value: web3.utils.toWei('0.1', 'ether')});
    expect(result.receipt.status).to.equal(true);
  })
  xit("should not allow to create sword while having one", async () => {
    await contractInstance.getBasicSword({from: alice, value: web3.utils.toWei('0.1', 'ether')});
    await utils.shouldThrow(contractInstance.getBasicSword({from: alice, value: web3.utils.toWei('0.1', 'ether')}));
  })
  it("should not allow to create sword with not enough eth", async () => {
    await utils.shouldThrow(contractInstance.getBasicSword({from: alice, value: web3.utils.toWei('0.5', 'ether')}));
  })
  
  it("should be battle to battle if sword is given", async () => {
    let result;
    result = await contractInstance.getBasicSword({from: alice, value: web3.utils.toWei('0.1', 'ether')});
    expect(result.receipt.status).to.equal(true);

    // run for times to check both win and loss scenario
    for (let i = 0; i < 10 ; i++) {
      result = await contractInstance.battleMonster(web3.eth.abi.encodeParameter('uint256',0), {from: alice, value: web3.utils.toWei('0.01', 'ether')});
      expect(result.receipt.status).to.equal(true);
      
      let ownerSwordCount = 1;

      // win scenario
      if (result.logs[0].args.attackLog.didUserWin) {
        ownerSwordCount++;
        console.log("WONNN");
      }
 
      result = await contractInstance.getUserSwordCount(alice, {from: alice});
      expect(result.logs[0].args.userSwords.toString()).to.equal(ownerSwordCount.toString());
    }
  })
  it("should not allow to battle with not enough fee", async () => {
    let result;
    result = await contractInstance.getBasicSword({from: alice, value: web3.utils.toWei('0.1', 'ether')});
    expect(result.receipt.status).to.equal(true);
    await utils.shouldThrow(contractInstance.battleMonster({from: alice, value: web3.utils.toWei('0.0', 'ether')}));
  })
  it("should not allow if not owner of the user", async () => {
    let result;
    result = await contractInstance.getBasicSword({from: alice, value: web3.utils.toWei('0.1', 'ether')});
    expect(result.receipt.status).to.equal(true);
    await utils.shouldThrow(contractInstance.battleMonster({from: bob, value: web3.utils.toWei('0.01', 'ether')}));
  })

}); 