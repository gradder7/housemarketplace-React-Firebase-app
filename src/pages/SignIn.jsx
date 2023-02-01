import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
// sign in authentication
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visiblityIcon from "../assets/svg/visibilityIcon.svg";

// if we do refresh the component renders before it get the data from firebase
//that why it is showing not logged in in refresh
export default function SignIn() {
  const [formdData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formdData;
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      // signInWithEmailAndPassword returns a promise
      const useCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //here i will get the full usercredential object
      console.log("usercredential=>", useCredentials);
      if (useCredentials.user) {
        navigate("/");
        toast.success("Welcome!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Invalid Credential", {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcone Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
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
            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          {/* google OAuth */}

          <Link to="/sign-up" className="registerLink">
            Sign Up
          </Link>
        </main>
      </div>
    </>
  );
}
