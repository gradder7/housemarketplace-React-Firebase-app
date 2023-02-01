import React, { useState, useEffect,useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function useAuthStatus() {
  // logged in out not
  const [loggedIn, setLoggedIn] = useState(false);
  // checking status like loading
  //if we get the response we make it false
  const [chekingStatus, setChekingStatus] = useState(true);
  const isMounted=useRef(true);

  useEffect(() => {
    //memory leak fix
    if(isMounted){
        const auth = getAuth();
        //second parameter the functuion gives us back a user object
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setLoggedIn(true);
          }
          //when we get the response do false
          setChekingStatus(false);
        });
    }
    return()=>{
        isMounted.current=false;
    }
  },[isMounted]);
  return { loggedIn, chekingStatus };
}
