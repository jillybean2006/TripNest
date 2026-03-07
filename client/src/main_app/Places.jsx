import React, { useEffect, useState } from "react";
import { getUser, getTrips } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./Profile.css";



export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);



  
  useEffect(() => {
    async function loadProfile() {
      try {
        const userData = await getUser();
        console.log("USER DATA:", userData);
        setUser(userData);

        const tripsData = await getTrips();
        console.log("TRIPS DATA:", tripsData);
        setTrips(tripsData?.trips || []);
      } catch (err) {
        console.error("PROFILE ERROR:", err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");


  }

  if (loading) {
    return <h1 className="profile-loading">Loading Profile...</h1>;
  }

  if (!user) {
    return <h1 className="profile-loading">No user data found.</h1>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name ? user.name.substring(0, 2).toUpperCase() : "U"}
        </div>

        <h2 className="profile-name">{user?.name || "User"}</h2>
        <p className="profile-email">{user?.email || "No email found"}</p>

        <div className="profile-actions">
          <button
            onClick={() => navigate("/plan-trip")}
            className="btn-blue"
          >
            Plan a Trip
          </button>

          <button
            onClick={() => navigate("/explore")}
            className="btn-dark"
          >
            Explore Places
          </button>

          <button
            onClick={logout}
            className="btn-red"
          >
            Logout
          </button>
        </div>

        <h3 className="profile-trips-title">Your Trips</h3>

        <div className="profile-trips">
          {trips.length === 0 && <p>No trips planned yet</p>}

          {trips.map((t) => (
            <div
              key={t._id}
              onClick={() => navigate(`/trip/${t._id}`)}
              className="trip-card"
            >
              <p>
                <b>{t.from}</b> ➝ <b>{t.to}</b>
              </p>
              <p className="trip-info">
                {t.days} days | {t.travelers} people
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}