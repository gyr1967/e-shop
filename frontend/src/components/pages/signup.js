import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user-info");
    if (user) {
      navigate("/");
    }
  });

  const collectData = async () => {
    const data = {
      name,
      email,
      password,
    };
    let result = await fetch("http://localhost:3001/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result.message) {
      console.log(result.message);
      alert(result.message);
      return;
    }
    localStorage.setItem("user-info", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate("/");
  };

  return (
    <div className="signup-login">
      <h1>Sign Up</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputBox"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={collectData} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
}
