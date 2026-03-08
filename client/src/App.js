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
import Restaurants from "./main_app/Restaurants.jsx";
import Transport from "./main_app/Transport.jsx";
import EditTrip from "./main_app/EditTrip.jsx";

export default function App() {
  return (
    <Routes>

      
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/profile" element={<Profile />} />

      
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      
      <Route path="/plan-trip" element={<TripPlanner />} />
      <Route path="/trip/:id" element={<TripDetails />} />

      
      <Route path="/places/:places" element={<Places />} />
      <Route path="/restaurants/:places" element={<Restaurants />} />
      <Route path="/hotels/:places" element={<Hotels />} />

     
      <Route path="/transport" element={<Transport />} />

     
      <Route path="/edit-trip/:id" element={<EditTrip />} />

      
      <Route
        path="*"
        element={<h2 style={{ padding: "20px" }}>Page not found</h2>}
      />

    </Routes>
  );
}