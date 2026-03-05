import { useNavigate } from "react-router-dom";

  export default function Home() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  return (
    <div>

      <h1>Welcome to TripNest!</h1>
      <p>
        Your personalized travel experience starts here. Plan trips,
        book hotels, and transport.
      </p>

      <div>
        <button
           onClick={() =>
            token ? navigate("/profile") : navigate("/register")
          }
        >
          {token ? "Go to Profile" : "Get Started"}
        </button>



        <button onClick={() => navigate("/explore")}>
          Explore Destinations
        </button>
      </div>


      <div>
        <h3>Destinations and Food</h3>
        <p>Discover amazing places around the world.</p>
      </div>



      <div>
        <h3>Transportation</h3>
        <p>Cabs, buses, uber, trains and flights.</p>
      </div>



      <div>
        <h3>Hotels and Stay Options</h3>
        <p>Book hotels, hostels, Airbnbs and more.</p>
      </div>

    </div>
  );
}