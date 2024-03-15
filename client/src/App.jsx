import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import About from "../src/pages/About";
import Profile from "../src/pages/Profile";
import Signin from "../src/pages/Signin";
import Signup from "../src/pages/Signup";

export default function App() {
  return (
    <>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    
    </>
  );
}
