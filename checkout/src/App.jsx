import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home.jsx";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
