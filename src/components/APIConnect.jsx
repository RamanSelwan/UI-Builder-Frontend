const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5002/api/auth";

// General function to get full API endpoint
export  function getApiEndpoint(route) {
  return `${BACKEND_URL}/${route}`;
}

// Example usage:
// getApiEndpoint("call_action") => "http://localhost:5002/api/auth/call_action"
// getApiEndpoint("header") => "http://localhost:5002/api/auth/header"

// ✅ Wrapper function with timeout (default 60 sec)
export async function fetchWithTimeout(route, options = {}, timeout = 60000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(getApiEndpoint(route), {
      ...options,
      signal: controller.signal,
    });
    return response.json();
  } finally {
    clearTimeout(id);
  }
}