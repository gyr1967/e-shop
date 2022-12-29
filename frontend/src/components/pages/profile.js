import React, {useEffect} from "react";

export default function Profile() {
  const [showInput, setShowInput] = React.useState(false);
  const user = localStorage.getItem("user-info");
  
  const updateEmail = () => {
    console.log("button clicked");
  };

  const updatePassword = () => {
    console.log("button2 clicked");
  };

  return (
    <div className="product-list">
      <h1>Profile page</h1>
      <p>Username: { JSON.parse(user).name }</p>
      <p>Email: { JSON.parse(user).email }</p>
      <button className="appButton" onClick={ ()=>setShowInput(true) }>Update email</button>
      { showInput && <input type="text" placeholder="Enter new email" /> }
      <button className="appButton" onClick={ updatePassword }>Update password</button>
    </div>
  );
}