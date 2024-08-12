import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductLists = () => {
  const [products, setProducts] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProdcuts = async () => {
    const response = await fetch("https://dummyjson.com/products", {
      method: "GET",
    });
    const data = await response.json();
    setProducts(data.products);
  };
  useEffect(() => {
    getProdcuts();
  }, []);

  useEffect(() => {
    const filteredData = products.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTxt.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTxt.toLowerCase())
    );
    setFilteredProducts(filteredData);
  }, [searchTxt]);

  return (
    <div className="product-list">
      <section className="search">
        <input
          type="text"
          placeholder="Search a product..."
          value={searchTxt}
          onChange={(e) => {
            setSearchTxt(e.target.value);
          }}
          autoFocus
        />
      </section>
      <section className="showProducts">
        {searchTxt && filteredProducts.length === 0 ? (
          <div>
            <h2>No Product Available!</h2>
          </div>
        ) : searchTxt && filteredProducts.length !== 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          products.map((item) => <ProductCard key={item.id} product={item} />)
        )}
      </section>
    </div>
  );
};

export default ProductLists;
