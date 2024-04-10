"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";

interface NavBarProps {
  account: string;
  setAccount: (newAccount: string) => void;
}

function NavBar({ account, setAccount }: NavBarProps) {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // console.log(accounts);
    setAccount(accounts[0]);
    // signer = await provider.getSigner();
  };

  const disconnectHandler = async () => {};

  return (
    <nav className="flex w-full py-3 px-5 justify-between">
      <ul className="flex items-center gap-4 font-semibold">
        <li className="cursor-pointer transition-all ease-in-out hover:scale-110">
          Buy
        </li>
        <li className="cursor-pointer transition-all ease-in-out hover:scale-110">
          Rent
        </li>
        <li className="cursor-pointer transition-all ease-in-out hover:scale-110">
          Sell
        </li>
      </ul>
      <Link className="flex items-center gap-2 text-3xl" href="/">
        <Image src={"/logo.jpg"} width={70} height={70} alt="logo" />
        <h1 className="font-semibold">
          <span className="text-blue-900">WR</span> Real State
        </h1>
      </Link>
      {window.ethereum ? (
        <div className="flex items-center text-white font-semibold">
          {account ? (
            <button
              className="py-3 px-5 bg-purple-400 rounded-md hover:bg-purple-500 transition-all ease-in-out text-sm"
              onClick={() => disconnectHandler()}
            >
              {account.slice(0, 6)}...{account.slice(38, 42)}
            </button>
          ) : (
            <button
              className="py-3 px-5 bg-purple-400 rounded-md hover:bg-purple-500 transition-all ease-in-out text-sm"
              onClick={() => connectHandler()}
            >
              Connect
            </button>
          )}
        </div>
      ) : (
        <>Install Metamask</>
      )}
    </nav>
  );
}

export default NavBar;
