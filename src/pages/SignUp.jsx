import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// authentication sign up
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// to save data in database
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// db we created for firebase store
import { db } from "../firebase.config";

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visiblityIcon from "../assets/svg/visibilityIcon.svg";
import { async } from "@firebase/util";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const [shwoPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleOnChnage = (e) => {
    // take the values from th target
    // fro other fields also we can use it
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      // store the value wrt to the id of that element
      [id]: value,
    }));
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    //1=> signup authentication
    try {
      //getting auth value from get auth
      const auth = getAuth();
      // return a promise
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // get the user info here for db
      const user = userCredentials.user;
      // updating the display name
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      //2=>for data base set
      // make form data copy
      const formDataCpy = { ...formData };
      //delete the password from formData cpy
      delete formDataCpy.password;
      //add time to the form data copy by server time
      formDataCpy.timeStamp = serverTimestamp();

      // Add a new document in collection in users
      // setDoc=> update the database
      //formDatacpy is data to be in that document
      await setDoc(doc(db, "users", user.uid), formDataCpy);
      // after where to navigate
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcone Back!</p>
        </header>
        <main>
          <form onSubmit={onsubmit}>
            <input
              type="text"
              className="nameInput"
              id="name"
              placeholder="Name"
              value={name}
              onChange={handleOnChnage}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleOnChnage}
              className="emailInput"
            />
            <div className="passwordInputDiv">
              <input
                type={shwoPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={password}
                onChange={handleOnChnage}
                className="passwordInput"
              />
              <img
                src={visiblityIcon}
                alt="showPassword"
                onClick={() => setShowPassword((prevstate) => !prevstate)}
                className="showPassword"
              />
            </div>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>
            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#ffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          {/* google OAuth */}

          <Link to="/sign-in" className="registerLink">
            Already have a account? Sign In
          </Link>
        </main>
      </div>
    </>
  );
}
