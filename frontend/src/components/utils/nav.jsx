import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const user = localStorage.getItem("user-info");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
        <img
            alt="logo"
            className="logo"
            src="https://1.bp.blogspot.com/-_GEdIn8WlPs/YJtUwh2xYiI/AAAAAAAAHzs/G7afb0-w0ZAtczANwPSU3Lapd6RS__NgQCLcBGAsYHQ/s0/doge.png"
          />
      {user ? (
        <ul className="nav-ul">
          
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <div className="logout">
          <li>
            <Link onClick={logout} to="/login">
              Logout ({JSON.parse(user).name})
            </Link>
          </li>
          </div>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
