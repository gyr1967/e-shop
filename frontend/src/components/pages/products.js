import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch("http://localhost:3001/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await response.json();
    setProducts(data);
  };

  const deleteProductplease = async (id) => {
    console.log("did something");
    const result = await fetch(`http://localhost:3001/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await result.json();
    if (data) {
      console.log(data);
      getProducts();
    }
  };

  const searchDB = async (e) => {
    if (e.target.value) {
      const response = await fetch(
        `http://localhost:3001/search/${e.target.value}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      const data = await response.json();
      if (data) {
        setProducts(data);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type="text"
        className="search-product-box"
        placeholder="Search"
        onChange={searchDB}
      />


      {products.length > 0 ? (
        <>
              <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Actions</li>
      </ul>

        {products.map((product, index) => (
          <ul key={product._id}>
            <li>{index + 1}</li>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li>{product.category}</li>
            <li>
              <button onClick={() => deleteProductplease(product._id)}>
                Delete
              </button>
              <Link to={"/update/" + product._id} className="button">
                Edit
              </Link>
            </li>
          </ul>
        ))}
        </>
      ) : (
        <h1>no products found</h1>
      )}
    </div>
  );
}
