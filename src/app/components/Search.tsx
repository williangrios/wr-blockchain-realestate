import React from "react";

function Search() {
  return (
    <div
      className="relative flex flex-col gap-4 items-center justify-center w-full py-24 lg:py-48 px-2"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      }}
    >
      <h2 className="font-semibold z-10 text-white">
        Search it. Explore it. Buy it.
      </h2>
      <input
        type="text"
        className="border border-black outline-none rounded-md p-2 w-[400px] text-black z-10"
        placeholder="Enter an address, neighborhood, city or ZIP code"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/searchbg.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: "0.5", // Aqui você pode ajustar o valor da opacidade conforme necessário
        }}
      ></div>
    </div>
  );
}

export default Search;
