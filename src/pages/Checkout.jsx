import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { api } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Checkout = ({ setOrder }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(null);
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(8);
  const [promo, setPromo] = useState(0);
  const [error, setError] = useState({ error: false, message: "" });
  const [address, setAddress] = useState({
    logradouro: "",
    bairro: "",
    cidade: "",
    localidade: "",
  });
  const [formattedNumber, setFormattedNumber] = useState("");
  const [formattedExpirationDate, setFormattedExpirationDate] = useState("");
  const [formattedCC, setCC] = useState("");

  const handlePayment = (data) => {
    if (handleValidateCreditCard(data.cc.replace(/ /g, ""))) {
      setError({ error: false, message: "" });
      createorder();
    } else {
      setError({ error: true, message: "Verifique os dados do cartão" });
    }
  };

  const createorder = async () => {
    const productsDTO = JSON.parse(Cookies.get("cart"));
    await api
      .post(`/orders`, {
        products: productsDTO,
      })
      .then((res) => {
        console.log(res.data);
        Cookies.remove("cart");
        navigate("/checkout/success");
      });
  };

  const handleCart = async () => {
    if (
      Cookies.get("cart") === undefined ||
      Cookies.get("cart") === "" ||
      Cookies.get("cart") === "[]"
    )
      window.location = "/";
    const cartObj = JSON.parse(Cookies.get("cart"));

    const productPromises = cartObj.map(async (item) => {
      const res = await api.get(`/products/${item.productId}`);
      return {
        product: res.data,
        size: item.size,
        quantity: item.quantity,
      };
    });

    const newProducts = await Promise.all(productPromises);
    setProducts(newProducts);

    const subtotalValue = newProducts.reduce((acc, item) => {
      return acc + item.quantity * parseFloat(item.product.price);
    }, 0);

    setSubtotal(subtotalValue);
    setTotal(subtotalValue + shipping - promo);
  };

  const addQuantity = (item) => {
    const cartCookies = JSON.parse(Cookies.get("cart"));
    cartCookies.map((prod) => {
      if (prod.productId === item.product.id && prod.size === item.size) {
        const size = item.product.sizes.find((sz) => sz.size === item.size);
        if (size.quantity > prod.quantity) prod.quantity += 1;
        else
          toast.error("Você atingiu o máximo de unidades por produto"),
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            };
      }
    });
    Cookies.set("cart", JSON.stringify(cartCookies));
  };

  const removeQuantity = (item) => {
    const cartCookies = JSON.parse(Cookies.get("cart"));
    cartCookies.map((prod) => {
      if (prod.productId === item.product.id && prod.size === item.size) {
        if (prod.quantity > 1) prod.quantity -= 1;
        else cartCookies.pop(prod);
      }
    });
    Cookies.set("cart", JSON.stringify(cartCookies));
  };

  const handlePhoneChange = (e) => {
    const input = e.replace(/\D/g, "");
    const match = input.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

    if (match) {
      const formatted = `(${match[1]}${match[2] ? ") " + match[2] : ""}${
        match[3] ? "-" + match[3] : ""
      }`;
      setFormattedNumber(formatted);
    } else {
      setFormattedNumber(input);
    }
  };

  const handleCC = (e) => {
    const formattedInput = e
      .replace(/\D/g, "")
      .replace(/(\d{4})(\d{0,4})(\d{0,4})(\d{0,4}).*/, "$1 $2 $3 $4");

    setCC(formattedInput);
  };

  const handleValidateCreditCard = (cardNumber) => {
    if (!/^\d+$/.test(cardNumber)) return false;

    if (cardNumber.length < 13 || cardNumber.length > 19) return false;

    let sum = 0;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if ((cardNumber.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }

    return sum % 10 === 0;
  };

  const handleCcExpirationDate = (e) => {
    const input = e;
    const formattedInput = input
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{0,2}).*/, "$1/$2");

    setFormattedExpirationDate(formattedInput);
  };

  const handlePromo = () => {
    setPromo(subtotal * 0.05);
    toast.success("Cupom de 5% de desconto adicionado com sucesso!"),
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      };
  };

  const handleAddress = async (cep) => {
    if (cep.length === 8) {
      try {
        await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
          setAddress(res.data);
        });
      } catch (error) {
        if (cep.length === 9) {
          await axios
            .get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`)
            .then((res) => {
              setAddress(res.data);
            });
        }
      }
    }
  };

  const handleUserLogin = () => {
    const token = Cookies.get("hyzedauth.token");
    if (token === undefined || token === "") navigate("/login");
  };

  useEffect(() => {
    handleUserLogin();
    handleCart();
    api.get("/products");
  }, [handlePromo]);

  return (
    <section className="bg-gray-100 h-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 p-4 text-xs">
        <div className="p-12 border-r-[1px] border-gray-400">
          <form onSubmit={handleSubmit(handlePayment)}>
            <div className="space-y-5">
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
                    onChange={(e) => handleAddress(e.target.value)}
                    placeholder="CEP"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    {...register("address")}
                    required
                    placeholder="Endereço"
                    value={address.logradouro}
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
                    value={address.bairro}
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                  <input
                    {...register("state")}
                    required
                    placeholder="Estado"
                    value={address.localidade}
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div>
                  <input
                    {...register("telephone")}
                    required
                    placeholder="Número de Telefone"
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    value={formattedNumber}
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
                    onChange={(e) => handleCC(e.target.value)}
                    value={formattedCC}
                    placeholder="Número do cartão de crédito/débito"
                    className="w-full p-2 rounded-md shadow-sm border-[1px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    {...register("expirationDate")}
                    required
                    placeholder="Data de Validade (MM/AA)"
                    onChange={(e) => handleCcExpirationDate(e.target.value)}
                    value={formattedExpirationDate}
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
              <div className={error.error ? "text-red-600" : "hidden"}>
                <p>{error.message}</p>
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
            {products.map((item, idx) => (
              <div className="flex items-center gap-4" key={idx}>
                <div className="h-[70px] w-[80px] border-gray-300 border-[1px] flex items-center justify-center">
                  <img
                    src={item.product.images[0].url}
                    alt="Foto do produto"
                    className="h-[60px]"
                  />
                </div>
                <div className="w-full flex justify-between items-center gap-4">
                  <div className="flex justify-between w-full items-center">
                    <div className="uppercase">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-gray-400">Tamanho: {item.size}</p>
                    </div>
                    <div className="justify-end flex">
                      <div className="flex items-center gap-2 border-[1px] border-gray-300">
                        <button
                          onClick={() => removeQuantity(item)}
                          className="w-[25px] h-[25px] bg-gray-300"
                        >
                          -
                        </button>
                        <span className="">{item.quantity}</span>
                        <button
                          onClick={() => addQuantity(item)}
                          className="w-[25px] h-[25px] bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>
                      R$
                      {(parseFloat(item.product.price) * item.quantity).toFixed(
                        2
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-4 gap-4">
              <input
                className="p-2 rounded-md shadow-sm border-[1px] col-span-3"
                placeholder="Cupom de desconto"
              />
              <button
                onClick={() => handlePromo()}
                className="p-2 rounded-md shadow-sm border-[1px]"
              >
                Aplicar
              </button>
            </div>
            <div className="space-y-2 text-gray-900">
              <div className="flex justify-between w-full items-center">
                <p className="uppercase">Subtotal</p>
                <p className="font-bold">R${subtotal}</p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="uppercase">Frete</p>
                <p className="font-bold">+R${shipping}</p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="uppercase">Desconto</p>
                <p className="font-bold">-R${promo}</p>
              </div>
              <div className="flex justify-between w-full items-center text-3xl font-bold">
                <p className="uppercase">Total</p>
                <p>R${total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};
export default Checkout;
