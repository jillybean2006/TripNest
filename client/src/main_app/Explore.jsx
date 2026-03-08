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
      const res = await searchPlaces(query);
      setPlaces(res.places || []);
    } catch (err) {
      setPlaces([]);
    }
  }

  return (
    <section>
      <h1 className="section-title">Explore Destinations</h1>
      <p className="section-text">Search for places to plan your trip.</p>

      <form className="search-row" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search places"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="retro-btn teal">
          Search
        </button>
      </form>

      <div className="results-grid">
        {places.map((place, index) => {
          const placeName = place.places || place.name || place;
          return (
            <div key={index} className="result-card">
              <h3>{placeName}</h3>

              <button
                className="retro-btn plum"
                onClick={() =>
                  navigate(`/places/${encodeURIComponent(placeName)}`)
                }
              >
                View Place
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}