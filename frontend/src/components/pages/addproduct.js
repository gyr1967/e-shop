import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);

  const addProductToDB = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const userID = JSON.parse(localStorage.getItem("user-info"))._id;
    const data = {
      name,
      price,
      category,
      userID,
      company,
    };
    let result = await fetch("http://localhost:3001/addproduct", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    alert("Product has been added");
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      <button onClick={addProductToDB} className="appButton" type="submit">
        Add Product
      </button>
    </div>
  );
}
