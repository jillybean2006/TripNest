import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, getTrips } from "../utils/api";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const userRes = await getUser();
        const tripsRes = await getTrips();

        setUser(userRes.user || userRes);
        setTrips(tripsRes.trips || tripsRes || []);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  if (loading) {
    return <h2 className="section-title">Loading profile...</h2>;
  }

  return (
    <section className="profile-page">
      <h1 className="profile-title">My Profile</h1>

      <div className="profile-grid">
        <div className="profile-panel">
          <h2>User Info</h2>
          <p>Name: {user?.name || "User"}</p>
          <p>Email: {user?.email || "No email found"}</p>

          <div className="hero-actions">
            <button
              className="retro-btn gold"
              onClick={() => navigate("/plan-trip")}
            >
              Plan a Trip
            </button>

            <button
              className="retro-btn plum"
              onClick={() => navigate("/explore")}
            >
              Explore
            </button>

            <button
              className="retro-btn crimson"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="trip-panel">
          <h2>My Trips</h2>

          {trips.length === 0 ? (
            <p>No trips yet.</p>
          ) : (
            <div className="trip-list">
              {trips.map((trip) => (
                <div key={trip._id} className="trip-item">
                  <div>
                    <strong>{trip.from}</strong> → <strong>{trip.to}</strong>
                  </div>

                  <div className="hero-actions">
                    <button
                      className="retro-btn teal"
                      onClick={() => navigate(`/trip/${trip._id}`)}
                    >
                      View
                    </button>

                    <button
                      className="retro-btn plum"
                      onClick={() => navigate(`/edit-trip/${trip._id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}