"use client";
import Image from "next/image";
import {
  escrowAddress,
  escrowAbi,
  realStateAddress,
  realStateAbi,
} from "../blockchain/constants";
import { FaHome } from "react-icons/fa";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Search from "./components/Search";
import ShowHomes from "./components/ShowHomes";

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");

  const loadBlockchainData = async () => {
    let signer = null;
    let provider;
    console.log("iniciou busca-----");

    if (window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      // const network = await provider.getNetwork();
      // const escrow = new ethers.Contract(escrowAddress, escrowAbi, provider);
      // const realState = new ethers.Contract(
      //   realStateAddress,
      //   realStateAbi,
      //   provider
      // );
      // const totalSupply = await realState.totalSupply();
      // console.log(totalSupply);

      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.getAddress(accounts[0]);
        setAccount(account);
      });
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center max-w-6xl w-full m-auto">
      <NavBar account={account} setAccount={setAccount} />
      <Search />
      <ShowHomes />
      <Footer />
    </main>
  );
}
