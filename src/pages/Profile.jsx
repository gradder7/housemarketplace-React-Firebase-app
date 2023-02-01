import React, { useState } from "react";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  // useEffect(() => {
  //   // we will get current user object only  from userCrendial objects
  //   console.log(auth.currentUser);
  //   setUser(auth.currentUser);
  // }, []);
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={onLogout}>
            Logout
          </button>
        </header>
      </div>
    </>
  );
}
