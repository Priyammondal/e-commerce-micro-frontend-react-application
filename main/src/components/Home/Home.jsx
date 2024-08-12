import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import jacket from "../../assets/jacket.jpg";
import headphone from "../../assets/headphone.jpg";
import ipad from "../../assets/ipad.jfif";

const Home = () => {
  return (
    <div className="homepage">
      <section className="left">
        <h1>
          International
          <br /> Ecommerce, We Are
          <br /> Here
        </h1>
        <p>
          Same tech for less Save by
          <br /> shopping on Shop.
        </p>
        <Link to="/products">
          <button>
            See More <i class="fa fa-arrow-right"></i>
          </button>
        </Link>
      </section>
      <section className="middle">
        <img src={jacket} alt="jacket" />
      </section>
      <section className="right">
        <img src={headphone} alt="headphone" />
        <img src={ipad} alt="ipad" />
      </section>
    </div>
  );
};

export default Home;
