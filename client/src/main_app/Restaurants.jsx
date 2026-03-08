import { useParams } from "react-router-dom";


export default function Restaurants() {
  const { places } = useParams();

  if (!places) {
    return <h2>Invalid destination</h2>;
  }

  return (
    <div className="restaurants-page">
      <h1>🍽 Restaurants & Cafes in {places}</h1>
      <p>Discover top-rated food places using Google Maps.</p>

      <a
        href={`https://www.google.com/maps/search/restaurants+in+${encodeURIComponent(places)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Restaurants on Google Maps
      </a>
    </div>
  );
}