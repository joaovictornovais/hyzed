import React from "react";

const Order = ({}) => {
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
      </div>
    </section>
  );
};

export default Order;
