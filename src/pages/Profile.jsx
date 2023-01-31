import React, { useState } from "react";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    console.log(auth.currentUser);
    setUser(auth.currentUser);
  }, []);
  return user ? <h1>{user.displayName}</h1>:<>Not LoggedIn</>;
}
