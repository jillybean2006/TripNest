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
      const res = await loginUser(email, password);

      if (res.token) {
        localStorage.setItem("token", res.token);
        alert("Login Successful");
        navigate("/profile");
      } else {
        alert(res.message || "Login failed");
      }

    } catch (error) {
      alert("Login failed");
    }
  }



  return (
    <div className="login-page">

      <div className="login-card">

        <h2 className="login-title">
          Login
        </h2>


        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>



          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          

        </form>

        <p className="login-footer">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="register-link"
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}