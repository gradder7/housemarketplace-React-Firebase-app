import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// if you dont want the user can acces the page unless you logged in you create a private route
const PrivateRoute = () => {
  const loggedIn = true;
  return (
    // outlet render child elements
    loggedIn ? <Outlet /> : <Navigate to={"/sign-in"} />
  );
};

export default PrivateRoute;
