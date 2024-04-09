import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Escrow", function () {
  let buyer, seller, inspector, lender;
  let buyerAddress,
    realStateAddress,
    escrowAddress,
    sellerAddress,
    inspectorAddress,
    lenderAddress;
  let realState, escrow;
  async function deployRealState() {
    const RealState = await ethers.getContractFactory("RealState");
    realState = await RealState.deploy();
    [seller, buyer, inspector, lender] = await ethers.getSigners();
    realStateAddress = await realState.getAddress();
    sellerAddress = await seller.getAddress();
    buyerAddress = await buyer.getAddress();
    inspectorAddress = await inspector.getAddress();
    lenderAddress = await lender.getAddress();
  }

  async function deployEscrow() {
    const Escrow = await ethers.getContractFactory("Escrow");
    escrow = await Escrow.deploy(
      realStateAddress!,
      sellerAddress!,
      inspectorAddress!,
      lenderAddress!
    );
    escrowAddress = await escrow.getAddress();
  }

  it("Should Deploy Real State", async function () {
    await deployRealState();
    console.log("Real State address => ", await realState!.getAddress());
  });

  it("Should Deploy Escrow", async function () {
    await deployEscrow();
    console.log("Escrow address => ", await escrow!.getAddress());
    const resultNftAddress = await escrow!.nftAddress();
    expect(resultNftAddress).to.be.equal(realStateAddress!);
    const resultseller = await escrow!.seller();
    expect(resultseller).to.be.equal(sellerAddress!);
    const resultinspector = await escrow!.inspector();
    expect(resultinspector).to.be.equal(inspectorAddress!);
    const resultlender = await escrow!.lender();
    expect(resultlender).to.be.equal(lenderAddress!);
  });

  it("Should Mint", async function () {
    const transaction = await realState!
      .connect(seller!)
      .mint(
        "https://gateway.pinata.cloud/ipfs/QmYXymC148Epw3FRftHvW2JVLThpC7yEzYs67mni6hNW1K"
      );
    await transaction.wait();
  });

  it("Should update ownership", async function () {
    const transaction = await realState!
      .connect(seller!)
      .approve(escrowAddress!, 1);
    await transaction.wait();
    const transactionList = await escrow!
      .connect(seller!)
      .list(1, buyerAddress!, 100, 1);
    await transactionList.wait();
    expect(await realState!.ownerOf(1)).to.be.equal(escrowAddress!);
  });

  it("Should update as listed", async function () {
    expect(await escrow!.isListed(1)).to.be.equal(true);
  });

  it("Returns buyer", async function () {
    const result = await escrow!.buyer(1);
    expect(result).to.be.equal(buyerAddress!);
  });

  it("Returns purchasePrice", async function () {
    const result = await escrow!.purchasePrice(1);
    expect(result).to.be.equal(100);
  });

  it("Should Update contract balance", async function () {
    const transaction = await escrow!
      .connect(buyer!)
      .depositEarnest(1, { value: 10 });
    await transaction.wait();
    const result = await escrow!.getBalance();
    expect(result).to.be.equal(10);
  });

  it("Should Update contract inspection status", async function () {
    const transaction = await escrow!
      .connect(inspector!)
      .updateInspectionStatus(1, true);
    await transaction.wait();
    const result = await escrow!.inspectionPassed(1);
    expect(result).to.be.equal(true);
  });

  it("Should Update approval status", async function () {
    const transaction = await escrow!.connect(buyer!).approveSale(1);
    await transaction.wait();
    const transaction1 = await escrow!.connect(seller!).approveSale(1);
    await transaction1.wait();
    const transaction2 = await escrow!.connect(lender!).approveSale(1);
    await transaction2.wait();

    expect(await escrow!.approval(1, await seller!.getAddress())).to.be.equal(
      true
    );
    expect(await escrow!.approval(1, await buyer!.getAddress())).to.be.equal(
      true
    );
    expect(await escrow!.approval(1, await lender!.getAddress())).to.be.equal(
      true
    );
  });
});
