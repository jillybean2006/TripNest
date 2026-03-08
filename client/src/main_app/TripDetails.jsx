import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTripById, deleteTrip } from "../utils/api";


export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrip() {
      try {
        const data = await getTripById(id);
        setTrip(data?.trip || data);
      } catch (err) {
        console.error("LOAD TRIP ERROR:", err);
        alert("Failed to load trip");
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    }

    loadTrip();
  }, [id, navigate]);

  async function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete this trip?");
    if (!confirmDelete) return;

    try {
      const res = await deleteTrip(id);

      if (res.message === "Trip deleted successfully") {
        alert("Trip deleted successfully");
        navigate("/profile");
      } else {
        alert(res.message || "Delete failed");
      }
    } catch (error) {
      console.error("DELETE TRIP ERROR:", error);
      alert("Delete failed");
    }
  }

  if (loading) {
    return <h2>Loading trip...</h2>;
  }

  if (!trip) {
    return <h2>Trip not found</h2>;
  }

  return (
    <div className="trip-details-page">
      <h2>{trip.from} → {trip.to}</h2>
      <p>{trip.days} days • {trip.travelers} people</p>

      <div className="trip-actions">
        <button onClick={() => navigate(`/edit-trip/${trip._id}`)}>
          Edit Trip
        </button>

        <button onClick={handleDelete}>
          Delete Trip
        </button>

        <button onClick={() => navigate(`/places/${trip.to}`)}>
          Places to Visit
        </button>

        <button onClick={() => navigate(`/restaurants/${trip.to}`)}>
          Restaurants
        </button>

        <button onClick={() => navigate(`/hotels/${trip.to}`)}>
          Hotels
        </button>

        <button onClick={() => navigate(`/transport?from=${trip.from}&to=${trip.to}`)}>
          Transport Options
        </button>
      </div>
    </div>
  );
}