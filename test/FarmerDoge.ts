import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers, network} from "hardhat";
import {HardhatNetworkConfig} from "hardhat/types";

async function resetChain() {
  const jsonRpcUrl = (network.config as HardhatNetworkConfig).forking
    ?.url;
  const remoteProvider = new ethers.providers.JsonRpcProvider(jsonRpcUrl)
  const blockNumber = await remoteProvider.getBlockNumber();
  console.log(blockNumber)

  await network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl,
          blockNumber,
        },
      },
    ],
  });
}

describe("FarmerDoge", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    await resetChain();
    const [owner, otherAccount] = await ethers.getSigners();

    const IterableMapping = await ethers.getContractFactory("IterableMapping");
    const iterableMapping = await IterableMapping.deploy();
    await iterableMapping.deployed();

    const FarmerDoge = await ethers.getContractFactory("contracts/FarmerDogeV3.sol:FarmerDoge",
      {
        libraries:{
          IterableMapping: iterableMapping.address
        }
      });
    const farmerDoge = await FarmerDoge.deploy();
    await farmerDoge.deployed();

    return { farmerDoge, owner, otherAccount };
  }

  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      const { farmerDoge, owner } = await loadFixture(deploy);

      expect(await farmerDoge.owner()).to.equal(owner.address);
    });
  });
});
