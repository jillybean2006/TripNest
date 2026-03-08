import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { saveTrip } from "../utils/api";


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

  if (!trip.from || !trip.to || !trip.days || !trip.travelers) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await saveTrip({
      from: trip.from,
      to: trip.to,
      days: Number(trip.days),
      travelers: Number(trip.travelers),
    });

    console.log("SAVE TRIP RESPONSE:", res);

    if (res.message === "Trip created successfully") {
      alert("Trip saved successfully!");
      navigate("/profile");
    } else {
      alert(res.message || "Trip failed to save");
    }
  } catch (error) {
    console.error("TRIP SUBMIT ERROR:", error);
    alert("Trip failed to save");
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