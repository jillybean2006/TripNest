import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const linkClass = (path) =>
    location.pathname === path ? "active-link" : "nav-link";

  return (
    <nav className="navbar">

      
      <h1
        className="logo"
        onClick={() => navigate("/")}
      >
        TravelMate
      </h1>

      <div className="nav-links">

        <Link to="/" className={linkClass("/")}>
          Home
        </Link>

        <Link to="/explore" className={linkClass("/explore")}>
          Explore
        </Link>

        {!token && (
          <>
            <Link to="/login" className={linkClass("/login")}>
              Login
            </Link>
            <Link to="/register" className={linkClass("/register")}>
              Register
            </Link>
          </>
        )}

        {token && (
          <>
            <Link to="/profile" className={linkClass("/profile")}>
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}