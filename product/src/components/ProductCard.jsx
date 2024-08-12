import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`${product.id}`, { state: { product: product } });
  };
  const handleAdd = (e) => {
    // e.stopPropagation();
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.filter((item) => item.id === product.id).length === 0) {
      const newCartItems = [...cartItems, { ...product, count: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      window.dispatchEvent(
        new CustomEvent("cartUpdated", { detail: newCartItems })
      );
    }
  };
  const handleRemove = (e) => {
    // e.stopPropagation();
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.filter((item) => item.id === product.id).length !== 0) {
      const newCartItems = cartItems.filter((item) => item.id !== product.id);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      window.dispatchEvent(
        new CustomEvent("cartUpdated", { detail: newCartItems })
      );
    }
  };
  return (
    <div
      className="productCard"
      // to={`${product.id}`}
      // state={{ product: product }}
    >
      <section className="thumbnail" onClick={handleCardClick}>
        <img src={product.thumbnail} alt="product image" />
      </section>
      <section className="details">
        <h3>{product.title}</h3>
        <div>
          <p>$ {product.price}</p>{" "}
          <p>{"⭐".repeat(Math.round(product.rating))}</p>
        </div>
        <div className="btn-wrapper">
          <button onClick={(e) => handleAdd(e)}>Add To Cart</button>
          {/* <button onClick={(e) => handleRemove(e)}>Remove</button> */}
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
