// Centralized API URL for the client
const isProduction =
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1";

const envApi = import.meta.env.VITE_API_URL;

// Helpful default fallback to prevent silent misconfiguration in production
const fallbackProdApi = "https://todo-backend-steel-six.vercel.app";

const API_URL =
  envApi || (isProduction ? fallbackProdApi : "http://localhost:6005");

if (isProduction && !envApi) {
  console.warn("VITE_API_URL is not set; using fallback API_URL:", API_URL);
}

export default API_URL;
