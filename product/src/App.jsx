import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import ProductLists from "./components/ProductLists";
import ProductPage from "./components/ProductPage";

const App = () => {
  return (
    <div className="product">
      <Routes>
        <Route path="/" element={<ProductLists />} />
        <Route path="/:productId" element={<ProductPage />} />
      </Routes>
    </div>
  );
};

export default App;
