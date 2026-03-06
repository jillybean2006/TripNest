
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:3000";

export async function searchPlaces(query) {
    return { places: [] };
}

export async function registerUser(formData) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
}

export async function loginUser(formData) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
}

export async function getUser(token) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getTrips(token) {
  const res = await fetch(`${API_BASE}/trips`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}







