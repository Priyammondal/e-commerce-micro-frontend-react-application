import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orderItems")) || []
  );
  const orderStatus = ["ordered", "shipped", "delivered"];
  const navigate = useNavigate();

  useEffect(() => {
    if (modal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "unset";
    }
  }, [modal]);

  const getDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    return currentDate;
  };

  const handleNavigate = (data) => {
    navigate(`/trackorder/${data.orderId}`, { state: data });
  };

  return (
    <div className="order">
      {orders.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>You have not ordered anything!</h2>
      ) : (
        <table className="order-table">
          <tr>
            <th>Order ID</th>
            <th>Order</th>
            <th>Date</th>
            <th>Category</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
          {orders.map((orderItem) => (
            <tr
              key={orderItem.id}
              onClick={() => {
                window.scrollTo(0, 0);
                setModal(true);
                setModalData({
                  ...orderItem,
                  orderId: orderItem.id * 100 + 350 * 200 - (400 % 34),
                  orderStatus: orderStatus[orderItem.id % orderStatus.length],
                });
              }}
            >
              <td>#{orderItem.id * 100 + 350 * 200 - (400 % 34)}</td>
              <td>{orderItem.title}</td>
              <td>{getDate()}</td>
              <td>{orderItem.category}</td>
              <td>Paid</td>
              <td>{orderStatus[orderItem.id % orderStatus.length]}</td>
              <td>$200</td>
            </tr>
          ))}
        </table>
      )}
      {modal && (
        <div
          className="modal"
          onClick={(e) => {
            if (e.target.className !== "modal-body") {
              setModal(false);
            }
          }}
        >
          <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <div className="close" onClick={() => setModal(false)}>
              ❌
            </div>
            <div className="product-wrapper">
              <section thumbnail>
                <img src={modalData.thumbnail} alt="product image" />
              </section>
              <section className="details">
                <h3>{modalData.title}</h3>
                <h4>{modalData.availabilityStatus}</h4>
                <p>{modalData.description}</p>
                <p>Category: {modalData.category}</p>
                <p>Brand: {modalData.brand}</p>
                <div>
                  <p>$ {modalData.price}</p>{" "}
                  <p>{"⭐".repeat(Math.round(modalData.rating))}</p>
                </div>
                <button onClick={() => handleNavigate(modalData)}>
                  Track Order
                </button>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
