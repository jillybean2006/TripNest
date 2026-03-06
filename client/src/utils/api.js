const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function registerUser(formData) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}


export async function loginUser(formData) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}


export async function searchPlaces(query) {
  const res = await fetch(`${API_BASE}/api/places/search?query=${encodeURIComponent(query)}`);
  return res.json();
}


export async function getUser(token) {
  const res = await fetch(`${API_BASE}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}


export async function getTrips(token) {
  const res = await fetch(`${API_BASE}/api/trip`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}


export async function saveTrip(tripData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/api/trip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tripData),
  });

  return res.json();
}