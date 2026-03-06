import React from "react";
import { useParams } from "react-router-dom";
import "./Places.css";

export default function Places() {
  const { city } = useParams();
  const encodedCity = encodeURIComponent(city);

  

  return (
    <div className="places-page">

      <div className="places-card">

        <h1 className="places-title">
          Places to Visit in {city}
        </h1>

        <p className="places-description">
          Discover popular attractions, landmarks, and sightseeing spots.
        </p>


        <div className="places-links">

          <a
            href={`https://www.google.com/maps/search/things+to+do+in+${encodedCity}`}
            target="_blank"
            rel="noreferrer"
            className="places-btn purple-btn"
          >
            View Attractions on Google Maps
          </a>


          <a
            href={`https://en.wikipedia.org/wiki/${encodedCity}`}
            target="_blank"
            rel="noreferrer"
            className="places-btn blue-btn"
          >
            Read About {city} on Wikipedia
          </a>



          <a
            href={`https://www.tripadvisor.in/Search?q=${encodedCity}`}
            target="_blank"
            rel="noreferrer"
            className="places-btn green-btn"
          >
            Explore on TripAdvisor
          </a>

        </div>



        <p className="places-footer">
          We provide trusted external sources to ensure you always get
          accurate and up-to-date information for any destination worldwide.
        </p>

      </div>

    </div>
  );
}