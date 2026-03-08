import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";


export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await registerUser(form);

      if (res.message === "User registered successfully") {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (error) {
      console.error("REGISTER FRONTEND ERROR:", error);
      alert("Something went wrong during registration");
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <button type="submit">Register</button>
        </form>

        <p
          className="login-link"
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer" }}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}