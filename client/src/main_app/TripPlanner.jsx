import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { saveTrip } from "../utils/api";

export default function TripPlanner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [trip, setTrip] = useState({
    from: "",
    to: params.get("to") || "",
    days: "",
    travelers: "",
  });

  useEffect(() => {
    if (location.state?.destination) {
      setTrip((prev) => ({
        ...prev,
        to: location.state.destination,
      }));
    }
  }, [location.state]);

  function handleChange(e) {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await saveTrip(trip);

      if (res.trip?._id) {
        navigate(`/trip/${res.trip._id}`);
      } else {
        alert(res.message || "Trip saved");
      }
    } catch (err) {
      alert("Could not save trip");
    }
  }

  return (
    <section>
      <h1 className="section-title">Plan Your Trip</h1>

      <div className="two-panel-grid">
        <div className="panel-card">
          <form className="form-stack" onSubmit={handleSubmit}>
            <input
              type="text"
              name="from"
              placeholder="From"
              value={trip.from}
              onChange={handleChange}
            />
            <input
              type="text"
              name="to"
              placeholder="To"
              value={trip.to}
              onChange={handleChange}
            />
            <input
              type="text"
              name="days"
              placeholder="Days"
              value={trip.days}
              onChange={handleChange}
            />
            <input
              type="text"
              name="travelers"
              placeholder="Travelers"
              value={trip.travelers}
              onChange={handleChange}
            />

            <button type="submit" className="retro-btn gold">
              Save Trip
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}