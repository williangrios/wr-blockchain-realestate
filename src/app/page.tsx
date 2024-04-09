import Image from "next/image";
import { escrowAddress, escrowAbi } from "../blockchain/constants";
import { FaHome } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FaHome />
    </main>
  );
}
