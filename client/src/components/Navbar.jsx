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

  function linkClass(path) {
    return location.pathname === path
      ? "site-link active-link"
      : "site-link";
  }

  return (
    <header className="site-header">
      <nav className="site-nav">
        <div className="site-logo" onClick={() => navigate("/")}>
          TripNest
        </div>

        <div className="site-links">
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

              <button onClick={handleLogout} className="retro-btn crimson">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}