import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await registerUser(form);

      if (res.message === "User registered successfully") {
        alert("Registration Successful");
        navigate("/login");
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="username"
              required
              placeholder="Enter your name"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="register-footer">
          Already have an account?
          <span onClick={() => navigate("/login")} className="login-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}