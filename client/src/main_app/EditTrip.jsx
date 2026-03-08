import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTripById, updateTrip } from "../utils/api";

export default function EditTrip() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    from: "",
    to: "",
    days: "",
    travelers: ""
  });

  useEffect(() => {
    async function loadTrip() {
      const data = await getTripById(id);

      if (data.trip) {
        setTrip(data.trip);
      }
    }

    loadTrip();
  }, [id]);

  function handleChange(e) {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await updateTrip(id, trip);

    if (res.message === "Trip updated successfully") {
      alert("Trip updated!");
      navigate(`/trip/${id}`);
    } else {
      alert("Update failed");
    }
  }

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>

      <h2>Edit Trip</h2>

      <form onSubmit={handleSubmit}>

        <label>From</label>
        <input
          type="text"
          name="from"
          value={trip.from}
          onChange={handleChange}
          required
        />

        <label>To</label>
        <input
          type="text"
          name="to"
          value={trip.to}
          onChange={handleChange}
          required
        />

        <label>Days</label>
        <input
          type="number"
          name="days"
          value={trip.days}
          onChange={handleChange}
        />

        <label>Travelers</label>
        <input
          type="number"
          name="travelers"
          value={trip.travelers}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>

      </form>

    </div>
  );
}