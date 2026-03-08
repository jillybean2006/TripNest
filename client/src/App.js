import { Routes, Route } from "react-router-dom";

import Home from "./main_app/Home.jsx";
import Explore from "./main_app/Explore.jsx";
import Hotels from "./main_app/Hotels.jsx";
import Register from "./main_app/Register.jsx";
import Login from "./main_app/Login.jsx";
import Profile from "./main_app/Profile.jsx";
import TripPlanner from "./main_app/TripPlanner.jsx";
import TripDetails from "./main_app/TripDetails.jsx";
import Places from "./main_app/Places.jsx";



function Restaurants() {
  return <h2 style={{ padding: 20 }}>Restaurants page coming soon</h2>;
}

function Transport() {
  return <h2 style={{ padding: 20 }}>Transport options coming soon</h2>;
}

function EditTrip() {
  return <h2 style={{ padding: 20 }}>Edit Trip page coming soon</h2>;
}

export default function App() {
  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />

      {/* Auth */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      
      <Route path="/profile" element={<Profile />} />

      
      <Route path="/plan-trip" element={<TripPlanner />} />

      
      <Route path="/trip/:id" element={<TripDetails />} />

     
      <Route path="/places/:destination" element={<Places />} />
      <Route path="/restaurants/:destination" element={<Restaurants />} />
      <Route path="/hotels/:destination" element={<Hotels />} />
      <Route path="/transport" element={<Transport />} />

      
      <Route path="/edit-trip/:id" element={<EditTrip />} />

      
      <Route path="*" element={<h2 style={{ padding: 20 }}>Page not found</h2>} />
    </Routes>
  );
}