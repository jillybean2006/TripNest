import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/profile");
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (err) {
      alert("Something went wrong while registering");
    }
  }

  return (
    <section className="register-page">
      <div className="register-card">
        <h1 className="register-title">Create Account</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" className="retro-btn plum">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}