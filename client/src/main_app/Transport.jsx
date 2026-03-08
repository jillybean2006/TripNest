import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Transport() {
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to");

  if (!to) {
    return <h2 className="section-title">Destination not provided</h2>;
  }

  return (
    <section>
      <h1 className="section-title">Transport Options to {to}</h1>
      <p className="section-text">Choose how you want to travel.</p>

      <div className="results-grid">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${to}`}
          target="_blank"
          rel="noreferrer"
          className="result-card"
        >
          Google Maps Routes
        </a>

        <a
          href={`https://m.uber.com/looking?dropoff[formatted_address]=${to}`}
          target="_blank"
          rel="noreferrer"
          className="result-card"
        >
          Uber
        </a>

        <a
          href="https://www.google.com/flights"
          target="_blank"
          rel="noreferrer"
          className="result-card"
        >
          Flights
        </a>
      </div>
    </section>
  );
}