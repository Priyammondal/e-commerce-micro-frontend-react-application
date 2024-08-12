import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/:product_id" element={<Home />} />
    </Routes>
  );
};

export default App;
