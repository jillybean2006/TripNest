import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { saveTrip } from "../utils/api";
import "./TripPlanner.css";

export default function TripPlanner() {
  const location = useLocation();
  const [params] = useSearchParams();

  const [trip, setTrip] = useState({
    from: "",
    to: params.get("to") || "",
    days: "",
    travelers: ""
  });





  useEffect(() => {
    if (location.state?.destination) {
      setTrip((prev) => ({
        ...prev,
        to: location.state.destination
      }));
    }
  }, [location.state]);




  function handleChange(e) {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!trip.from || !trip.to) {
      alert("From and To fields are required");
      return;
    }

    const res = await saveTrip(trip);

    if (res.message === "Trip Saved Successfully") {
      alert("Trip Saved Successfully 🎉");
      setTrip({
        from: "",
        to: "",
        days: "",
        travelers: ""
      });
    } else {
      alert("Failed to save trip");
    }
  }



  return (
    <div className="tripplanner-page">
      <div className="tripplanner-card">

        <h2 className="tripplanner-title">Plan Your Trip</h2>

        <form onSubmit={handleSubmit} className="tripplanner-form">

          <input
            name="from"
            placeholder="From City"
            value={trip.from}
            onChange={handleChange}
            className="tripplanner-input"
          />



          <input
            name="to"
            placeholder="Destination City"
            value={trip.to}
            onChange={handleChange}
            className="tripplanner-input"
          />

          <input
            name="days"
            placeholder="Number of Days"
            value={trip.days}
            onChange={handleChange}
            className="tripplanner-input"
          />

          <input
          
            name="travelers"
            placeholder="Number of Travelers"
            value={trip.travelers}
            onChange={handleChange}
            className="tripplanner-input"
          />

          <button type="submit" className="tripplanner-btn">
            Save Trip
          </button>

        </form>
      </div>
    </div>
  );
}