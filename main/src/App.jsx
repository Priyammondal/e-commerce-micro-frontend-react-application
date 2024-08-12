import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
const RemoteProductApp = React.lazy(() => import("product/ProductApp"));
const RemoteCheckoutApp = React.lazy(() => import("checkout/CheckoutApp"));
const RemoteOrderApp = React.lazy(() => import("order/OrderApp"));
const RemoteDeliveryApp = React.lazy(() => import("delivery/deliveryApp"));

const App = () => {
  return (
    <div className="main">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/*" element={<RemoteProductApp />} />
          <Route path="/checkout/*" element={<RemoteCheckoutApp />} />
          <Route path="/myorder/*" element={<RemoteOrderApp />} />
          <Route path="/trackorder/*" element={<RemoteDeliveryApp />} />
          <Route path="*" element={<div>404 Page not found!</div>} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
