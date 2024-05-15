import React from "react";
import ProductMinInfo from "../components/ProductMinInfo";

const Home = ({ products }) => {
  return (
    <main className="bg-gray-50 h-screen">
      <div className="p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductMinInfo
              key={product.id}
              name={product.name}
              price={product.price}
              images={product.images}
              sizes={product.sizes}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
