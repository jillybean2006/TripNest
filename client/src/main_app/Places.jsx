import React, { useState } from "react";
import { searchPlaces } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Places() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      const res = await searchPlaces(query);
      setPlaces(res.places || []);
    } catch {
      setPlaces([]);
    }
  }

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Explore Places</h1>

      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place"
          style={{ padding: "10px", width: "250px" }}
        />

        <button type="submit" style={{ marginLeft: "10px" }}>
          Search
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        {places.length === 0 && <p>No places found</p>}

        {places.map((p, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/place-details?place=${encodeURIComponent(p.name)}`)
            }
          >
            <b>{p.name}</b>
            <p>{p.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}