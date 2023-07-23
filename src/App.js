import "./styles.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import Menu from "./components/Menu";
import HeaderWarn from "./pages/HeaderWarn"
import EditUser from "./pages/EditUser";
export default function App() {
  return (
    <div className="main">
      <HeaderWarn />
      <div className="main-container">
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/edit" element={<EditUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
