import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [productDetails, setProductDetails] = useState({});
  const firstStepRef = useRef(null);
  const secondStepRef = useRef(null);
  const thirdStepRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.querySelector("body").style.overflowY = "auto";
    setProductDetails(location.state);
    if (location?.state?.orderStatus === "ordered") {
      firstStepRef.current.classList.add("firstStepDone");
    } else if (location?.state?.orderStatus === "shipped") {
      firstStepRef.current.classList.add("firstStepDone");
      secondStepRef.current.classList.add("secondStepDone");
    } else if (location?.state?.orderStatus === "delivered") {
      firstStepRef.current.classList.add("firstStepDone");
      secondStepRef.current.classList.add("secondStepDone");
      thirdStepRef.current.classList.add("thirdStepDone");
    }
  }, [location]);

  return (
    <div className="tracking">
      <div className="track">
        <section className="product-title">
          <h3>
            {productDetails?.title} - #{productDetails?.orderId}
          </h3>
          <h4 className="shipment-status">{productDetails?.orderStatus}</h4>
        </section>
        <section className="track-step">
          <ol>
            <li ref={firstStepRef}>
              <div>
                <p>Ordered</p>
                <p>15.30, September 9, 2024</p>
              </div>
            </li>
            <li ref={secondStepRef}>
              <div>
                <p>Shipped</p>
                <p>15.45, September 9, 2024</p>
              </div>
            </li>
            <li ref={thirdStepRef}>
              <div>
                <p>Delivered</p>
                <p>Estimated delivery by 17.30</p>
              </div>
            </li>
          </ol>
        </section>
        <section className="shipment-details">
          <div>
            <h3>Courier:</h3>
            <h5>Blue Dart</h5>
          </div>
          <div>
            <h3>Tracking Number:</h3>
            <h5>123445678789</h5>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
