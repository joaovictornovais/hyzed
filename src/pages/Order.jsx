import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Order = ({ order }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {};

  useEffect(() => {
    if (order === undefined) navigate("/");
    loadProducts();
  }, []);

  return (
    <section className="h-screen bg-gray-200">
      <div className="p-4 flex flex-col gap-6 justify-center items-center h-screen">
        <div>
          <h1 className="uppercase text-gray-800 font-bold">
            Pedido finalizado com sucesso!
          </h1>
          <p>
            Obrigado pela preferência e confiança, em breve o seu pedido chegará
            em suas mãos! :)
          </p>
        </div>
        <div>
          <h2>Pedido #{Math.floor(Math.random() * 1001) + 2000} </h2>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Order;
