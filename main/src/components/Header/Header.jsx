import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartPrice, setCartPrice] = useState(
    JSON.parse(localStorage.getItem("cartItems"))
      ?.reduce((acc, curr) => acc + curr.count * curr.price, 0)
      .toFixed(2)
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const items = localStorage.getItem("cartItems");
    return items ? JSON.parse(items) : [];
  });

  useEffect(() => {
    setCartPrice(
      cartItems
        .reduce((acc, curr) => acc + curr.count * curr.price, 0)
        .toFixed(2)
    );
  }, [cartItems]);

  useEffect(() => {
    const handleCartUpdate = (event) => {
      setCartItems(event.detail);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleAdd = (item) => {
    const newCartItems = cartItems.map((val) => {
      if (val.id === item.id) {
        val.count = +val.count + 1;
        return val;
      }
      return val;
    });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: newCartItems })
    );
  };
  const handleDelete = (item) => {
    const newCartItems = cartItems
      .map((val) => {
        if (val.id === item.id) {
          if (+val.count !== 1) {
            val.count = +val.count - 1;
            return val;
          }
          return null;
        }
        return val;
      })
      .filter((val) => val != null);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: newCartItems })
    );
  };

  useEffect(() => {
    setCartOpen(false);
  }, [location.pathname]);

  return (
    <nav>
      <Link to="/">
        <h2>Shop.</h2>
      </Link>
      <Link to="/myorder">
        <p>My Orders</p>
      </Link>
      <div className="cart">
        {cartItems.length !== 0 && <p>{cartItems.length}</p>}
        <i
          class="fa-solid fa-cart-shopping"
          onClick={() => {
            setCartOpen((prev) => !prev);
          }}
        ></i>
        {cartOpen && cartItems.length !== 0 && (
          <section className="cart-body">
            <div className="cart-items">
              {cartItems.map((item) => {
                return (
                  <>
                    <div className="cart-items-count">
                      <div>
                        {item.title} - ${item.price}
                      </div>
                      <div>
                        <button onClick={() => handleDelete(item)}>➖</button>
                        {item?.count}
                        <button onClick={() => handleAdd(item)}>➕</button>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            </div>
            <div className="checkout">
              <h3>Total: ${cartPrice}</h3>{" "}
              <button
                onClick={() => {
                  localStorage.removeItem("buyNow");
                  navigate("/checkout", { state: { from: "cart" } });
                }}
              >
                Checkout
              </button>
            </div>
          </section>
        )}
      </div>
    </nav>
  );
};

export default Header;
