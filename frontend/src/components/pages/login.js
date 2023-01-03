import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user-info");
    if (user) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    let result = await fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.auth) {
      delete result.user.password;
      localStorage.setItem("user-info", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="signup-login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter E-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Login
      </button>
    </div>
  );
}
