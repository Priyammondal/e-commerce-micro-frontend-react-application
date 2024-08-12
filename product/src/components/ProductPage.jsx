import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  useEffect(() => {
    localStorage.removeItem("buyNow");
  }, []);

  const handleClick = () => {
    navigate("/checkout", { state: { from: "productpage" } });
    localStorage.setItem("buyNow", JSON.stringify(product));
  };

  return (
    <div className="product-page">
      <div className="product-wrapper">
        <section thumbnail>
          <img src={product.thumbnail} alt="product image" />
        </section>
        <section className="details">
          <h3>{product.title}</h3>
          <h4>{product.availabilityStatus}</h4>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <div>
            <p>$ {product.price}</p>{" "}
            <p>{"⭐".repeat(Math.round(product.rating))}</p>
          </div>
          <div className="btn-wrapper">
            <button onClick={handleClick}>Buy Now</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
