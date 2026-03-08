import React from "react";
import { useParams } from "react-router-dom";

export default function Restaurants() {
  const { places } = useParams();

  if (!places) {
    return <h2 className="section-title">Invalid destination</h2>;
  }

  return (
    <section>
      <h1 className="section-title">Restaurants in {places}</h1>
      <p className="section-text">Find food options for your destination.</p>

      <div className="results-grid">
        <a
          href={`https://www.google.com/search?q=restaurants+in+${places}`}
          target="_blank"
          rel="noreferrer"
          className="result-card"
        >
          Search Restaurants on Google
        </a>

        <a
          href="https://www.yelp.com"
          target="_blank"
          rel="noreferrer"
          className="result-card"
        >
          Browse on Yelp
        </a>

        <a
          href="https://www.tripadvisor.com"
          target="_blank"
          rel="noreferrer"
          className="result-card"
        >
          View on TripAdvisor
        </a>
      </div>
    </section>
  );
}