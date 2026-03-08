import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-card">
          <h1 className="hero-title">Welcome to TripNest</h1>
          <p className="hero-text">
            Plan your next adventure with us!
          </p>

          <div className="hero-actions">
            {!token ? (
              <>
                <button
                  className="retro-btn gold"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </button>

                <button
                  className="retro-btn plum"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </>
            ) : (
              <button
                className="retro-btn gold"
                onClick={() => navigate("/explore")}
              >
                Explore Trips
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="feature-grid">
        <article className="feature-card">
          <h3>Explore</h3>
          <p>Search destinations and discover new places.</p>
        </article>

        <article className="feature-card">
          <h3>Plan</h3>
          <p>Build trips with transport, hotels, and activities.</p>
        </article>

        <article className="feature-card">
          <h3>Track</h3>
          <p>Keep your travel plans organized in one place.</p>
        </article>
      </section>
    </section>
  );
}