import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTripById, deleteTrip } from "../utils/api";

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrip() {
      try {
        const res = await getTripById(id);
        setTrip(res.trip || res);
      } catch (err) {
        console.error("Failed to load trip:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTrip();
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this trip?");
    if (!confirmed) return;

    try {
      await deleteTrip(id);
      navigate("/profile");
    } catch (err) {
      alert("Failed to delete trip");
    }
  }

  if (loading) {
    return <h2 className="section-title">Loading trip...</h2>;
  }

  if (!trip) {
    return <h2 className="section-title">Trip not found</h2>;
  }

  return (
    <section>
      <h1 className="section-title">Trip Details</h1>

      <div className="two-panel-grid">
        <div className="panel-card">
          <h2>{trip.from} → {trip.to}</h2>
          <p>Days: {trip.days}</p>
          <p>Travelers: {trip.travelers}</p>
        </div>

        <div className="panel-card">
          <div className="hero-actions">
            <button
              className="retro-btn plum"
              onClick={() => navigate(`/edit-trip/${trip._id}`)}
            >
              Edit Trip
            </button>

            <button
              className="retro-btn teal"
              onClick={() => navigate(`/transport?to=${encodeURIComponent(trip.to)}`)}
            >
              Transport
            </button>

            <button
              className="retro-btn crimson"
              onClick={handleDelete}
            >
              Delete Trip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}