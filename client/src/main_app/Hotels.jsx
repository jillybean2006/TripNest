import React from "react";
import { useParams } from "react-router-dom";

export default function Hotels() {
  const { places } = useParams();

  return (
    <section>
      <h1 className="section-title">Hotels in {places}</h1>
      <p className="section-text">Choose a hotel booking option below.</p>

      <div className="results-grid">
        <a
          href="https://www.booking.com"
          target="_blank"
          rel="noreferrer"
          className="result-card"
        >
          Booking.com
        </a>

        <a
          href="https://www.expedia.com"
          target="_blank"
          rel="noreferrer"
          className="result-card"
        >
          Expedia
        </a>

        <a
          href="https://www.hotels.com"
          target="_blank"
          rel="noreferrer"
          className="result-card"
        >
          Hotels.com
        </a>
      </div>
    </section>
  );
}