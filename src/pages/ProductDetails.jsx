import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import useQuery from "../hooks/QuerySearch";

const ProductDetails = () => {
  const { nome } = useParams();
  const [product, setProduct] = useState();
  const [availableSizes, setAvailableSizes] = useState([]);
  let query = useQuery();
  const navigate = useNavigate();

  let sizes = ["P", "M", "G", "GG"];

  const loadProduct = async () => {
    const nameWithSpaces = nome.replace(/-/g, " ");
    try {
      await api.get(`/products?name=${nameWithSpaces}`).then((res) => {
        setProduct(res.data);
        handleAvailableSizes(res.data.sizes);
      });
    } catch (error) {
      console.error("Erro ao carregar o produto:", error);
    }
  };

  const handleAvailableSizes = (sizes) => {
    const available = sizes
      .filter((item) => item.quantity > 0)
      .map((item) => item.size);
    setAvailableSizes(available);
  };

  const handleSize = (size) => {
    query.set("size", size);
    navigate(`?${query.toString()}`, { replace: true });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <section className="bg-gray-50 h-full">
      {product && (
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="hidden md:inline">
              {product.images.map((image) => (
                <img src={image.url} key={image.id} alt="Foto do produto" />
              ))}
            </div>
            <div className="inline md:hidden">
              <img src={product.images[0].url} alt="Foto do produto" />
            </div>
            <div className="md:fixed right-0 top-0 h-full overflow-y-auto w-full md:w-1/2 p-2">
              <div className="md:p-[4rem] p-2 xl:p-[8rem]">
                <div className="flex flex-col gap-4">
                  <div>
                    <h1 className="uppercase text-gray-900 font-bold">
                      {product.name}
                    </h1>
                    <span className="text-gray-600 text-xs font-medium">
                      ${product.price}
                    </span>
                  </div>
                  <div className="w-full h-[1px] bg-gray-200" />
                  <div>
                    <span className="text-xs text-gray-600 font-medium">
                      BLACK
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <img
                      src={product.images[0].url}
                      alt="Demonstração"
                      className="object-cover w-12 h-12 border-[1px] border-gray-300"
                    />
                  </div>
                  <div className="w-full h-[1px] bg-gray-200" />
                  <div className="text-xs text-gray-400 font-semibold">
                    {sizes.map((size, idx) => (
                      <label
                        key={idx}
                        onClick={() => handleSize(size)}
                        className={
                          query.get("size") === size &&
                          availableSizes.includes(size)
                            ? "mr-2 text-gray-800 cursor-pointer underline"
                            : query.get("size") === size &&
                              !availableSizes.includes(size)
                            ? "mr-2 text-gray-300 cursor-not-allowed underline"
                            : availableSizes.includes(size)
                            ? "mr-2 text-gray-800 cursor-pointer"
                            : "mr-2 text-gray-300 cursor-not-allowed"
                        }
                      >
                        {size}
                      </label>
                    ))}
                  </div>
                  <div className="w-full h-[1px] bg-gray-200" />
                  <div className="text-xs text-gray-700 font-medium">
                    <p>Frete grátis para compras acima de $150</p>
                  </div>
                  <div className="w-full h-[1px] bg-gray-200" />
                </div>
              </div>
              <div
                className={
                  query.get("size") === null ||
                  !availableSizes.includes(query.get("size"))
                    ? "grid grid-cols-1"
                    : "grid grid-cols-2 gap-4"
                }
              >
                <button className="uppercase hover:bg-gray-500 hover:border-gray-500 hover:text-zinc-100 transition-colors bg-black border-invisible text-xs py-3 p-2 rounded-sm text-white font-bold">
                  {query.get("size") === null
                    ? "Selecione um tamanho"
                    : availableSizes.includes(query.get("size"))
                    ? "Adicionar ao carrinho"
                    : "Tamanho indisponível"}
                </button>
                <button
                  className={
                    query.get("size") === null ||
                    !availableSizes.includes(query.get("size"))
                      ? "hidden"
                      : "uppercase hover:bg-gray-500 hover:border-gray-500 hover:text-zinc-100 transition-colors bg-white-900 border-black border-2 text-xs py-3 p-2 rounded-sm text-black font-bold"
                  }
                >
                  Comprar agora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetails;