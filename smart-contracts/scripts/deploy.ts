import { ethers } from "hardhat";

async function main() {
  const [seller, buyer, inspector, lender] = await ethers.getSigners();
  const RealState = await ethers.getContractFactory("RealState");
  const realState = await RealState.deploy();
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    await realState.getAddress(),
    await seller.getAddress(),
    await inspector.getAddress(),
    await lender.getAddress()
  );

  console.log(`RealState deployed to ${await realState.getAddress()}`);
  console.log(`Escrow deployed to ${await escrow.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
