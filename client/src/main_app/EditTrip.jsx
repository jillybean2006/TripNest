import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTripById, updateTrip } from "../utils/api";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    from: "",
    to: "",
    days: "",
    travelers: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrip() {
      try {
        const res = await getTripById(id);
        const foundTrip = res.trip || res;

        setTrip({
          from: foundTrip.from || "",
          to: foundTrip.to || "",
          days: foundTrip.days || "",
          travelers: foundTrip.travelers || "",
        });
      } catch (err) {
        console.error("Failed to load trip:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTrip();
  }, [id]);

  function handleChange(e) {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateTrip(id, trip);
      navigate(`/trip/${id}`);
    } catch (err) {
      alert("Failed to update trip");
    }
  }

  if (loading) {
    return <h2 className="section-title">Loading trip...</h2>;
  }

  return (
    <section>
      <h1 className="section-title">Edit Trip</h1>

      <div className="form-section">
        <div className="form-card">
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
              Update Trip
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}