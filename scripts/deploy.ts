import { ethers } from "hardhat";

async function main() {

  const FarmerDoge = await ethers.getContractFactory("contracts/FarmerDogeV3.sol:FarmerDoge");
  const farmerDoge = await FarmerDoge.deploy();

  await farmerDoge.deployed();

  console.log(`FarmerDoge deployed to ${farmerDoge.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
