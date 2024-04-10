import Image from "next/image";
import React from "react";

interface CardProps {
  image: string;
  price: string;
  sqft: string;
  bds: string;
  ba: string;
}

function Card() {
  return (
    <div className="border border-black flex flex-col gap-2 w-full h-full">
      <Image
        alt="Home"
        priority
        src={
          "https://img.freepik.com/fotos-gratis/villa-com-piscina-de-luxo-espetacular-design-contemporaneo-arte-digital-imoveis-casa-casa-e-propriedade-ge_1258-150749.jpg"
        }
        width={300}
        height={300}
        objectFit="cover"
        className="w-full"
      />
      <div className="flex flex-col gap-2 px-2 pb-2">
        <p className="">1 Eth</p>
        <p className="">2 bds | 1 ba | 100 sqft</p>
        <p className="">address</p>
      </div>
    </div>
  );
}

export default Card;
