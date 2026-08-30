import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// --- Farmers ---
export const createFarmer = (payload) => apiClient.post("/farmers", payload).then((r) => r.data);
export const getFarmer = (id) => apiClient.get(`/farmers/${id}`).then((r) => r.data);

// --- Buyers ---
export const listBuyers = (params) => apiClient.get("/buyers", { params }).then((r) => r.data);

// --- Prices ---
export const getCurrentPrice = (crop, params) =>
  apiClient.get(`/prices/${crop}`, { params }).then((r) => r.data);
export const getPriceHistory = (crop, params) =>
  apiClient.get(`/prices/${crop}/history`, { params }).then((r) => r.data);

// --- Sell Decision ---
export const getDecision = (payload) => apiClient.post("/decision", payload).then((r) => r.data);

// --- Agentic assistant ---
export const askAgent = (payload) => apiClient.post("/agent/query", payload).then((r) => r.data);

// --- Transactions ---
export const createTransaction = (payload) =>
  apiClient.post("/transactions", payload).then((r) => r.data);
