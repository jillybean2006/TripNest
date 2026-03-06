import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTripById } from "../utils/api";
import "./TripDetails.css";

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    async function loadTrip() {
      try {
        const data = await getTripById(id);
        setTrip(data);
      } catch (err) {
        alert("Failed to load trip");
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    }
    loadTrip();
  }, [id, navigate]);

  

  if (loading) {
    return <h2 className="tripdetails-status">Loading trip...</h2>;
  }

  if (!trip) {
    return <h2 className="tripdetails-status">Trip not found</h2>;
  }

  return (
    <div className="tripdetails-page">
      <div className="tripdetails-card">

        <h2 className="tripdetails-title">
          {trip.from} → {trip.to}
        </h2>




        <p className="tripdetails-subtitle">
          {trip.days} days • {trip.travelers} people
        </p>

        <hr className="tripdetails-divider" />

        <div className="tripdetails-actions">

          <button
            onClick={() => navigate(`/places/${trip.to}`)}
            className="action-btn btn-purple"
          >
            Places to Visit
          </button>



          <button
            onClick={() => navigate(`/restaurants/${trip.to}`)}
            className="action-btn btn-green"
          >
            Restaurants
          </button>

          <button
            onClick={() => navigate(`/hotels/${trip.to}`)}
            className="action-btn btn-blue"
          >
            Hotels
          </button>

        

          <button
            onClick={() => navigate(`/transport?from=${trip.from}&to=${trip.to}`)}
            className="action-btn btn-dark"
          >
            Transport Options
          </button>

        </div>
      </div>
    </div>
  );
}