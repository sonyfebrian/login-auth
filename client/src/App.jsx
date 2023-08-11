import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  const [userProfile, setUserProfile] = useState(null);

  console.log(userProfile, "cek user");
  return (
    <>
      <Routes>
        <Route path="/" element={<Login setUserProfile={setUserProfile} />} />
        <Route path="/home" element={<Home userProfile={userProfile} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
