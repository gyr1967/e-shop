import React from "react";
import { Link } from "react-router-dom";

export default function ProfileCard(props) {
  const user = props.user;
  return (
    <div className="product-list">
      <h1>Profile page</h1>
      <p>Username: {user.name}</p>
      <p>Email: {user.email}</p>
      <Link to={"/profile/updateemail/" + user._id} className="button">
        <button className="appButton">Update Email</button>
      </Link>
      <Link to={"/profile/updatepassword/" + user._id} className="button">
        <button className="appButton">Update password</button>
      </Link>
    </div>
  );
}
