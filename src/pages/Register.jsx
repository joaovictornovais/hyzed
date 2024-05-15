import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { signUp } = useContext(AuthContext);

  const handleRegister = async (data) => {
    await signUp(data);
  };

  return (
    <section className="form-section">
      <div className="space-y-4 p-4 min-w-[340px]">
        <img
          src="/logo.png"
          alt="Logo Hyzed"
          className="h-20 w-auto select-none mx-auto"
        />
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Registre-se
        </h2>
        <form className="max-w-[350px]" onSubmit={handleSubmit(handleRegister)}>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="shadow-sm max-w-[180px]">
                <label htmlFor="nome" className="sr-only">
                  Nome
                </label>
                <input
                  {...register("nome")}
                  id="nome"
                  name="nome"
                  placeholder="Nome"
                  required
                  className="text-sm p-2 text-gray-800 w-full rounded-md"
                />
              </div>
              <div className="shadow-sm max-w-[180px]">
                <label htmlFor="sobrenome" className="sr-only">
                  Sobrenome
                </label>
                <input
                  {...register("sobrenome")}
                  id="sobrenome"
                  name="sobrenome"
                  required
                  placeholder="Sobrenome"
                  className="text-sm p-2 text-gray-800 w-full rounded-md"
                />
              </div>
            </div>
            <div className="shadow-sm">
              <label htmlFor="nome" className="sr-only">
                E-mail
              </label>
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className="text-sm p-2 text-gray-800 w-full rounded-md"
              />
            </div>
            <div className="shadow-sm">
              <label htmlFor="senha" className="sr-only">
                Senha
              </label>
              <input
                {...register("senha")}
                id="senha"
                name="senha"
                required
                type="password"
                placeholder="Senha"
                className="text-sm p-2 text-gray-800 w-full rounded-md"
              />
            </div>
            <div className="shadow-sm">
              <label htmlFor="senhaConfirmada" className="sr-only">
                Confirme sua senha
              </label>
              <input
                {...register("senhaConfirmada")}
                id="senhaConfirmada"
                name="senhaConfirmada"
                required
                type="password"
                placeholder="Confirme sua senha"
                className="text-sm p-2 text-gray-800 w-full rounded-md"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" required />
              <label className="text-sm ml-2">
                Concordo com os{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-400"
                >
                  Termos de uso
                </a>
              </label>
            </div>
          </div>
          <div className="w-full mt-4 text-center bg-blue-900 p-2 text-white text-sm rounded-md cursor-pointer hover:bg-indigo-900 transition-colors">
            <button type="submit">Registrar</button>
          </div>
          <div className="text-center mt-2">
            <a href="/login" className="text-xs hover:underline text-gray-800">
              Já possui uma conta? Faça login
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
