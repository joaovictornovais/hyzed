import React from "react";
import { Link } from "react-router-dom";

const Checkout = ({ cart }) => {
  return (
    <section className="bg-gray-100 h-full">
      <div className="max-w-6xl mx-auto grid grid-cols-2 p-4 text-xs">
        <div className="p-12">
          <form>
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
                    placeholder="E-mail"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-3 w-3" />
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
                    placeholder="Nome"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                  <input
                    placeholder="Sobrenome"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div>
                  <input
                    placeholder="CEP"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    placeholder="Endereço"
                    className="w-full p-2 rounded-md shadow-sm border-[1px] col-span-2"
                  />
                  <input
                    placeholder="Número"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div>
                  <input
                    placeholder="Complemento (Sala, Apartamento, Andar...)"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    placeholder="Cidade"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                  <input
                    placeholder="Estado"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div>
                  <input
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
                    placeholder="Número do cartão de crédito/débito"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    placeholder="Data de Validade (MM/AA)"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                  <input
                    placeholder="Código de Segurança"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div>
                  <input
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
              <button className="bg-black text-white w-full p-4 text-xl uppercase font-bold rounded-md">
                Pagar agora
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
