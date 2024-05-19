import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [name, setName] = useState(null);

  const isAuthenticated = !!name;

  async function signUp({ nome, sobrenome, email, senha, senhaConfirmada }) {
    if (senha === senhaConfirmada) {
      const { token, name } = await api
        .post("/auth/register", {
          firstName: nome,
          lastName: sobrenome,
          email: email,
          password: senha,
        })
        .then((res) => {
          console.log(res);
          return res.data;
        });
      Cookies.set("hyzedauth.token", token, { expires: 1 });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      setName(name);

      navigate("/");
    }
  }

  async function signIn({ email, password }) {
    const { token, name } = await api
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        return res.data;
      });

    Cookies.set("hyzedauth.token", token);
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
    setName(name);

    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ name, isAuthenticated, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
