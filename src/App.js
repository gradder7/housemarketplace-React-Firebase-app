import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Category from "./pages/Category";
import AllListings from "./pages/AllListings";
import CreateListingPage from "./pages/CreateListingPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          {/* <Route path="/" element={<PrivateRoute />} >
          <Route path="/" element={<Explore />} />
          </Route> */}
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />

          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* private route */}
          <Route path="/profile" element={<PrivateRoute />}>
            {/* this is the child which outlet look to render  */}
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
        </Routes>
        {/* navbar component */}
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
