import React, { useEffect } from "react";

const ProductMinInfo = ({ name, price, images, sizes }) => {
  const allSizes = ["P", "M", "G", "GG", "GGG"];
  const availableSizes = [];

  const handleAvailableSizes = () => {
    sizes.map((item) => {
      if (item.quantity > 0) availableSizes.push(item.size);
    });
  };

  const handleQuantity = () => {
    if (sizes.length === 0) return "Sold out";
    handleAvailableSizes();
    if (availableSizes.length === 0) return "Sold out";
    return `$${price}`;
  };

  return (
    <div className="max-w-[300px]">
      <div className="group">
        <img
          src={images[0].url}
          alt="Imagem do produto"
          className="group-hover:hidden cursor-pointer"
        />
        <img
          src={images[1].url}
          alt="Imagem do produto"
          className="hidden group-hover:inline cursor-pointer"
        />
        <div className="mt-2 flex flex-col gap-1 text-xs">
          <a
            href="#"
            className="uppercase font-semibold text-gray-800 cursor-pointer"
          >
            {name}
          </a>
          <span className="text-gray-600 uppercase">{handleQuantity()}</span>
        </div>
        <div
          className={
            availableSizes.length > 0
              ? "hidden group-hover:inline text-[10px]"
              : "hidden"
          }
        >
          <div className="flex gap-4 mt-1">
            {allSizes.map((size, idx) => (
              <a
                href="#"
                key={idx}
                className={
                  availableSizes.indexOf(size) === -1
                    ? "text-gray-400"
                    : "text-gray-900 cursor-pointer hover:font-medium"
                }
              >
                {size}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMinInfo;
