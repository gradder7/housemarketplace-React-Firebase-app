import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Explore from "./pages/Explore";
import ForgetPassword from "./pages/ForgetPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
function App() {
  return (
<>
  <Router>
    <Routes>
    <Route path="/" element={<Explore/>}/>
    <Route path="/offers" element={<Offers/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-in" element={<SignUp/>}/>
    <Route path="/forgot-password" element={<ForgetPassword/>}/>
    </Routes>
    {/* navbar component */}
  </Router>
</>
  );
}

export default App;
