import React from "react";
import { Navigate, Outlet} from "react-router-dom";

export default function PrivateComponent() {
    let user = localStorage.getItem("user-info");
    try {
        user = JSON.parse(user);
    } catch (error) {
        user = null;
    }
    return (
        <div>
        {user ? (
            <Outlet />
        ) : (
            <Navigate to="/signup" />
        )}
        </div>
    );
}