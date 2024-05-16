import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Checkout = () => {
  const { register, handleSubmit } = useForm();

  const handlePayment = (data) => {
    console.log(data);
  };

  const handleCart = () => {
    if (Cookies.get("cart") === undefined) window.location = "/";
  };

  useEffect(() => {
    handleCart();
  }, []);

  return (
    <section className="bg-gray-100 h-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 p-4 text-xs">
        <div className="p-12 border-r-[1px] border-gray-400">
          <form onSubmit={handleSubmit(handlePayment)}>
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center uppercase">
                  <span className="font-bold text-gray-800">Contato</span>
                  <Link className="text-gray-600 underline" to="/login">
                    Log In
                  </Link>
                </div>
                <div>
                  <input
                    {...register("email")}
                    required
                    placeholder="E-mail"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    {...register("promotions")}
                    type="checkbox"
                    className="h-3 w-3"
                  />
                  <label className="ml-2">
                    Me envie notícias e promoções por e-mail
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center uppercase">
                  <span className="font-bold text-gray-800">Entrega</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    {...register("firstName")}
                    required
                    placeholder="Nome"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                  <input
                    {...register("lastName")}
                    required
                    placeholder="Sobrenome"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div>
                  <input
                    {...register("cep")}
                    required
                    placeholder="CEP"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    {...register("address")}
                    required
                    placeholder="Endereço"
                    className="w-full p-2 rounded-md shadow-sm border-[1px] col-span-2"
                  />
                  <input
                    {...register("number")}
                    required
                    placeholder="Número"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div>
                  <input
                    {...register("complement")}
                    placeholder="Complemento (Sala, Apartamento, Andar...)"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    {...register("city")}
                    required
                    placeholder="Cidade"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                  <input
                    {...register("state")}
                    required
                    placeholder="Estado"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div>
                  <input
                    {...register("telephone")}
                    required
                    placeholder="Número de Telefone"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col uppercase gap-1">
                  <span className="font-bold text-gray-800">Pagamento</span>
                  <p className="text-xs text-gray-400">
                    Todas as transações são seguras e encriptografadas
                  </p>
                </div>
                <div>
                  <input
                    {...register("cc")}
                    required
                    placeholder="Número do cartão de crédito/débito"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    {...register("expirationDate")}
                    required
                    placeholder="Data de Validade (MM/AA)"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                  <input
                    {...register("securityCode")}
                    required
                    placeholder="Código de Segurança"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div>
                  <input
                    {...register("nameOnCard")}
                    required
                    placeholder="Nome impresso no cartão"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="uppercase text-gray-800">
                  Ao clicar abaixo e concluir seu pedido, você concorda em
                  adquirir seu(s) item(s) da HyzedWear através da Global-E como
                  comerciante oficial para esta transação, nos{" "}
                  <span className="underline cursor-pointer">
                    Termos e Condições
                  </span>{" "}
                  e{" "}
                  <span className="underline cursor-pointer">
                    Política de Privacidade
                  </span>{" "}
                  da Global-E. A Global-E é um provedor internacional de
                  serviços de atendimento para a HyzedWear.
                </p>
              </div>
              <button
                type="submit"
                className="bg-black text-white w-full p-4 text-xl uppercase font-bold rounded-md"
              >
                Pagar agora
              </button>
            </div>
          </form>
        </div>
        <div className="p-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-[70px] w-[80px] border-gray-300 border-[1px] flex items-center justify-center">
                <img
                  src="https://cdn.shopify.com/s/files/1/0087/6193/3920/files/1905064_BLAC_1_64x64.jpg?v=1713556398"
                  alt="Foto do produto"
                />
              </div>
              <div className="w-full flex justify-between items-center gap-4">
                <div className="flex justify-between w-full items-center">
                  <div className="uppercase">
                    <p className="font-medium">Camiseta básica</p>
                    <p className="text-gray-400">Tamanho: M</p>
                  </div>
                  <div className="justify-end flex">
                    <div className="flex items-center gap-2 border-[1px] border-gray-300">
                      <button className="w-[25px] h-[25px] bg-gray-300">
                        -
                      </button>
                      <span className="">1</span>
                      <button className="w-[25px] h-[25px] bg-gray-300">
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <p>R$286,00</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <input
                className="p-2 rounded-md shadow-sm border-[1px] col-span-3"
                placeholder="Cupom de desconto"
              />
              <button className="p-2 rounded-md shadow-sm border-[1px]">
                Aplicar
              </button>
            </div>
            <div className="space-y-2 text-gray-900">
              <div className="flex justify-between w-full items-center">
                <p className="uppercase">Subtotal</p>
                <p className="font-bold">R$286</p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="uppercase">Frete</p>
                <p className="font-bold">+R$10</p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="uppercase">Desconto</p>
                <p className="font-bold">-R$0</p>
              </div>
              <div className="flex justify-between w-full items-center text-3xl font-bold">
                <p className="uppercase">Total</p>
                <p>R$296</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
