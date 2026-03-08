import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Places() {
  const navigate = useNavigate();
  const { places } = useParams();

  return (
    <section>
      <h1 className="section-title">{places}</h1>
      <p className="section-text">Choose what you want to explore next.</p>

      <div className="results-grid">
        <button
          className="result-card"
          onClick={() => navigate(`/restaurants/${encodeURIComponent(places)}`)}
        >
          Restaurants
        </button>

        <button
          className="result-card"
          onClick={() => navigate(`/hotels/${encodeURIComponent(places)}`)}
        >
          Hotels
        </button>

        <button
          className="result-card"
          onClick={() => navigate(`/transport?to=${encodeURIComponent(places)}`)}
        >
          Transport
        </button>

        <button
          className="result-card"
          onClick={() =>
            navigate(`/plan-trip?to=${encodeURIComponent(places)}`)
          }
        >
          Plan Trip
        </button>
      </div>
    </section>
  );
}