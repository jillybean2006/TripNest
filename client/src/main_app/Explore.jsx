import { useNavigate } from "react-router-dom";
import {searchPlaces} from "../utils/api";
import { useState } from "react";

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
    } catch { setPlaces([]); }
    }

    
    return (
        <div>
            <h1>Explore Destinations</h1>
            <form onSubmit={handleSearch}>
                <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations..."
                />  

                <button type="submit">Search</button>
            </form>

            <div>
                {places.map((c, i) => (
                    <div key={i}>
                    onClick={() => navigate(`/place/${c.id}`)}
                    <h3>{c.name}</h3>
                    <p>{c.description}</p>
                    </div>
                ))}

              {  places.length === 0 && query &&(
                <div onClick={() => navigate(`/plan-your-trip/${query}`)}>
                <h3> Plan a trip to {query} </h3>
                <p> Use custom destination</p>
                </div>
                )}
            </div>
        </div>
    );
}