import React, { useEffect, useState } from "react";
import ProductMinInfo from "../components/ProductMinInfo";
import { api } from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    await api.get("/products").then((res) => setProducts(res.data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

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
