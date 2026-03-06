import { Routes, Route } from "react-router-dom";

import Home from "./main_app/Home.jsx";
import Explore from "./main_app/Explore.jsx";
import Hotels from "./main_app/Hotels.jsx";

import Register from "./main_app/Register.jsx";
import Login from "./main_app/Login.jsx";
import Profile from "./main_app/Profile.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/plan-your-trip/:destination" element={<Hotels />} />

    
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />

    
      <Route path="*" element={<h2 style={{ padding: 20 }}>Page not found</h2>} />
    </Routes>
  );
}