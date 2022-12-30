import React from "react";

import { useNavigate, Link } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();

  const updatePassword = () => {
    console.log("button2 clicked");
  };

  console.log(user);

  return (
    <div className="product-list">
      <h1>Profile page</h1>
      <p>Username: {user.name}</p>
      <p>Email: {user.email}</p>
      <Link to={"/profile/updateemail/" + user._id} className="button">
      < button
    className="appButton">
     	Update Email
  </button>
      </Link>
      <button className="appButton" onClick={updatePassword}>
        Update password
      </button>
    </div>
  );
}
