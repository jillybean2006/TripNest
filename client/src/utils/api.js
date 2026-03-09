const API_BASE = https://tripnest-backend-pk6g.onrender.com/;
console.log("API_BASE:", API_BASE);



function getToken() {
  return localStorage.getItem("token");
}

function getAuthHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Something went wrong",
      ...data,
    };
  }

  return {
    success: true,
    ...data,
  };
}



export async function registerUser(formData) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return handleResponse(res);
}

export async function loginUser(formData) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return handleResponse(res);
}

export async function getUser() {
  const token = getToken();

  if (!token) {
    return {
      success: false,
      message: "No token found",
      user: null,
    };
  }

  const res = await fetch(`${API_BASE}/api/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
}



export async function searchPlaces(query) {
  const res = await fetch(
    `${API_BASE}/api/places/search?query=${encodeURIComponent(query)}`
  );

  const data = await handleResponse(res);

  if (!data.success) {
    return {
      success: false,
      places: [],
      message: data.message || "Failed to search places",
    };
  }

  return {
    success: true,
    places: data.places || [],
  };
}



export async function getTrips() {
  const token = getToken();

  if (!token) {
    return {
      success: false,
      trips: [],
      message: "No token found",
    };
  }

  const res = await fetch(`${API_BASE}/api/trip/my-trips`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await handleResponse(res);

  return {
    ...data,
    trips: data.trips || [],
  };
}

export async function getTripById(id) {
  const token = getToken();

  if (!token) {
    return {
      success: false,
      trip: null,
      message: "No token found",
    };
  }

  const res = await fetch(`${API_BASE}/api/trip/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
}

export async function saveTrip(tripData) {
  const token = getToken();

  if (!token) {
    return {
      success: false,
      message: "No token found",
    };
  }

  const res = await fetch(`${API_BASE}/api/trip/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(tripData),
  });

  return handleResponse(res);
}

export async function updateTrip(id, tripData) {
  const token = getToken();

  if (!token) {
    return {
      success: false,
      message: "No token found",
    };
  }

  const res = await fetch(`${API_BASE}/api/trip/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(tripData),
  });

  return handleResponse(res);
}

export async function deleteTrip(id) {
  const token = getToken();

  if (!token) {
    return {
      success: false,
      message: "No token found",
    };
  }

  const res = await fetch(`${API_BASE}/api/trip/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
}