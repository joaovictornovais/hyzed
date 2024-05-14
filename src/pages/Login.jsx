import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import React from "react";

const Login = () => {
  return (
    <section className="h-screen flex justify-center items-center bg-gray-100">
      <div className="space-y-4 p-4 min-w-[340px]">
        <img
          src="/logo.png"
          alt="Logo Hyzed"
          className="h-20 w-auto select-none mx-auto"
        />
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Faça Login
        </h2>
        <form className="text-sm space-y-2">
          <div className="shadow-sm">
            <label htmlFor="email" className="sr-only">
              E-mail
            </label>
            <input
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
          <div>
            <button className="w-full bg-blue-900 p-2 rounded-md text-white hover:bg-blue-800 hover:text-zinc-100">
              Login
            </button>
          </div>
          <div className="text-center">
            <a className="cursor-pointer hover:underline" href="#">
              Criar conta
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
