const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5002/api/auth";

// General function to get full API endpoint
export  function getApiEndpoint(route) {
  return `${BACKEND_URL}/${route}`;
}

// Example usage:
// getApiEndpoint("call_action") => "http://localhost:5002/api/auth/call_action"
// getApiEndpoint("header") => "http://localhost:5002/api/auth/header"