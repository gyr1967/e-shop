import React from "react";
import { Navigate, Outlet} from "react-router-dom";

export default function PrivateComponent() {
    let user = localStorage.getItem("user-info");
    const auth = localStorage.getItem("token");
    // check if auth is expired 
    console.log(auth);
    try {
        user = JSON.parse(user);
    } catch (error) {
        user = null;
    }
    return (
        <div>
        {(user) ? (
            <Outlet />
        ) : (
            <Navigate to="/signup" />
        )}
        </div>
    );
}