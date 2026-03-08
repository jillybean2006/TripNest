import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/profile");
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      alert("Something went wrong while logging in");
    }
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="retro-btn gold">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}