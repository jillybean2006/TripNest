import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPlaces } from "../utils/api";

export default function Explore() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      const results = await searchPlaces(query);
      setPlaces(results.places || []);
    } catch (error) {
      console.error("SEARCH ERROR:", error);
      setPlaces([]);
    }
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Explore Destinations</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations..."
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px",
          }}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {places.map((place, i) => (
          <div
            key={place.id || i}
            onClick={() => navigate(`/places/${place.name}`)}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: "#fff",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>{place.name}</h3>
            <p style={{ margin: 0 }}>{place.description}</p>
          </div>
        ))}

        {places.length === 0 && query && (
          <div
            onClick={() => navigate(`/plan-your-trip/${query}`)}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: "#fff",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>Plan a trip to {query}</h3>
            <p style={{ margin: 0 }}>Use custom destination</p>
          </div>
        )}
      </div>
    </div>
  );
}