import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  const handleLogin = async (data) => {
    await signIn(data);
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
          Faça Login
        </h2>
        <form
          className="text-sm space-y-2"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="shadow-sm">
            <label htmlFor="email" className="sr-only">
              E-mail
            </label>
            <input
              {...register("email")}
              id="email"
              name="email"
              className="p-2 rounded-md w-full"
              required
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="shadow-sm">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              required
              className="w-full p-2 rounded-md"
              placeholder="Senha"
            />
          </div>
          <div className="text-sm text-gray-800 flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4" />
              <label className="ml-2">Lembrar de mim</label>
            </div>
            <div>
              <a
                className="cursor-pointer hover:underline font-medium"
                href="#"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>
          <div className="w-full mt-4 text-center bg-blue-900 p-2 text-white text-sm rounded-md cursor-pointer hover:bg-indigo-900 transition-colors">
            <button type="submit">Login</button>
          </div>
          <div className="text-center mt-2">
            <a
              href="/registrar"
              className="text-xs hover:underline text-gray-800"
            >
              Novo por aqui? Crie uma conta
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
