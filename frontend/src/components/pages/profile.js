import React from "react";
import ProfileCard from "../utils/profileCard";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user-info"));

  console.log(user+ "console logged user");

  return (
    <ProfileCard user={user}/>
  );
}
