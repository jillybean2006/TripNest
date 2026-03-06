import React from "react";
import { useParams } from "react-router-dom";

export default function Hotels() {
  const { destination } = useParams();

  return (
    <div className="hotels-page">


      <h1 className="hotels-title">
        Hotels & Stay in {destination}
      </h1>

      <div className="hotels-links">

    
        <a
          href="https://www.booking.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hotel-card"
        >
           Book Hotels on Booking.com
        </a>

    

        <a
          href="https://www.makemytrip.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hotel-card"
        >
           Find Stays on MakeMyTrip
        </a>

        

        <a
          href="https://www.oyorooms.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hotel-card"
        >
           Budget Hotels on OYO
        </a>

    

        <a
          href="https://www.airbnb.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hotel-card"
        >
            Home Stays on Airbnb
        </a>

      </div>
    </div>
  );
}