import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

// if you dont want the user can acces the page unless you logged in you create a private route
const PrivateRoute = () => {
    const {loggedIn,chekingStatus}=useAuthStatus();
  if(chekingStatus){
    return <Spinner/>
  }
  return (
    // outlet render child elements
    loggedIn ? <Outlet /> : <Navigate to={"/sign-in"} />
  );
};

export default PrivateRoute;
