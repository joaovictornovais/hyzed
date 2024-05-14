import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const isAuthenticated = false;

  useEffect(() => {
    const token = Cookies.get("hyzedauth.token");
  }, []);

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

    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ name, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
