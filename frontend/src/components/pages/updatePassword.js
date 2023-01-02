import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateEmail() {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-info"));

  const updatePassword = async () => {
    console.log("updatePassword called");
    let result = await fetch(
      `http://localhost:3001/profile/updatepassword/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ password: newPassword }),
      }
    );
    result = await result.json();
    console.log(result+"did it work?");
    if (result) {
        navigate("/profile");
        }
  };

  const handleAttempt = async () => {
    const email = user.email;
    const password = oldPassword;
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
    console.log(result);
    if (result.auth) {
      updatePassword();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="product">
      <h1>Update Password</h1>
      <input
        className="inputBox"
        type="password"
        placeholder="Enter old password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button onClick={handleAttempt} className="appButton" type="button">
        Update Password
      </button>
    </div>
  );
}
