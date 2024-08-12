import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./Home.css";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Payment Successful!");
    setState({
      number: "",
      expiry: "",
      cvc: "",
      name: "",
      focus: "",
    });

    if (location?.state?.from === "cart") {
      const previousOrders = JSON.parse(localStorage.getItem("orderItems"));
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));

      if (previousOrders) {
        localStorage.setItem(
          "orderItems",
          JSON.stringify([...cartItems, ...previousOrders])
        );
      } else {
        localStorage.setItem("orderItems", JSON.stringify(cartItems));
      }
      localStorage.removeItem("cartItems");
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: [] }));
    } else if (location?.state?.from === "productpage") {
      const previousOrders = JSON.parse(localStorage.getItem("orderItems"));
      const buySingleItem = JSON.parse(localStorage.getItem("buyNow"));
      localStorage.setItem(
        "orderItems",
        JSON.stringify([...previousOrders, buySingleItem])
      );
      localStorage.removeItem("buyNow");
    }
    navigate("/myorder");
  };

  const handleCancel = () => {
    toast.error("Payment Canceled!");
    setState({
      number: "",
      expiry: "",
      cvc: "",
      name: "",
      focus: "",
    });
  };

  return (
    <div className="creditCardWrapper">
      <div className="card">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <form onSubmit={handleSubmit}>
          <input
            required
            type="number"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onInput={(e) => {
              if (e.target.value.length > 16) {
                e.target.value = e.target.value.slice(0, 16);
              }
            }}
          />
          <input
            required
            type="text"
            name="name"
            placeholder="Card Holder Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div>
            <input
              required
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={state.expiry.replace(/(\d{2})(\d{2})/, "$1/$2")}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={4}
            />
            <input
              required
              type="number"
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onInput={(e) => {
                if (e.target.value.length > 3) {
                  e.target.value = e.target.value.slice(0, 3);
                }
              }}
            />
          </div>
          <div className="pay">
            <button type="submit" className="paynow">
              Pay Now
            </button>
            <button type="button" className="cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
