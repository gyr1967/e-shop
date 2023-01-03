import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateEmail() {
  const [email, setEmail] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();

  const getEmailFromDB = async () => {
    let result = await fetch(
      `http://localhost:3001/profile/updateemail/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setEmail(result.email);
  };

  useEffect(() => {
    getEmailFromDB();
  }, []);

  const updateEmail = async () => {
    let result = await fetch(
      `http://localhost:3001/profile/updateemail/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ email }),
      }
    );
    result = await result.json();
    let user = JSON.parse(localStorage.getItem("user-info"));
    user.email = email;
    if (result) {
      localStorage.setItem("user-info", JSON.stringify(user));
      navigate("/profile");
    }
  };

  return (
    <div className="product">
      <h1>Update Email</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter new email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={updateEmail} className="appButton" type="button">
        Update Email
      </button>
    </div>
  );
}
