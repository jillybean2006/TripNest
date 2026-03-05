import { useParams } from "react-router-dom";
import "./Restaurants.css";



export default function Restaurants() {
  const { city } = useParams();

  if (!city) {
    return (
      <p className="restaurants-error">
        Invalid destination
      </p>
    );
  }


  return (
    <div className="restaurants-page">

      <div className="restaurants-card">

        <h1 className="restaurants-title">
          Restaurants & Cafes in {city}
        </h1>

        <p className="restaurants-description">
          Discover top-rated food places using Google Maps.
        </p>

        <a
          href={`https://www.google.com/maps/search/restaurants+in+${encodeURIComponent(city)}`}
          target="_blank"
          rel="noreferrer"
          className="restaurants-button"
        >
          View Restaurants on Google Maps
        </a>

      </div>


    </div>
  );
}