import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
