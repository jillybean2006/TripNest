import React from "react";
import { useSearchParams } from "react-router-dom";
import "./Transport.css";

export default function Transport() {
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to");

  if (!to) {
    return (
      <h2 className="transport-error">
        Destination not provided
      </h2>
    );
  }


  return (
    <div className="transport-page">

      <div className="transport-card">

        <h2 className="transport-title">
          Transport Options to {to}
        </h2>

        <div className="transport-links">

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${to}`}
            target="_blank"
            rel="noreferrer"
            className="transport-btn blue-btn"
          >
            View Routes on Google Maps
          </a>


          <a
            href={`https://www.irctc.co.in/nget/train-search`}
            target="_blank"
            rel="noreferrer"
            className="transport-btn green-btn"
          >
            Search Trains
          </a>
          

          <a
            href={`https://www.google.com/flights`}
            target="_blank"
            rel="noreferrer"
            className="transport-btn purple-btn"
          >
            Search Flights
          </a>

        </div>


      </div>

    </div>
  );
}