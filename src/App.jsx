import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Crypto from "./pages/crypto/Crypto";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto/:cryptoId" element={<Crypto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
