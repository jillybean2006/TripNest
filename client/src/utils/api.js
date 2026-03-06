export async function searchPlaces(query) {
  return { places: [] };
}

export async function registerUser(formData) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}

export async function loginUser(formData) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}

export async function getUser(token) {
  const res = await fetch("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function getTrips(token) {
  const res = await fetch("/api/trips", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}