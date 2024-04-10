import React from "react";
import Card from "./Card";

function ShowHomes() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="w-full px-2 py-10">
      <h2 className="w-full border-b border-gray-400 pb-2 font-semibold">
        Homes for you
      </h2>
      <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {arr.map((item, i) => (
          <Card key={i} />
        ))}
      </div>
    </div>
  );
}

export default ShowHomes;
