import http from "../services/httpService";
import { Investment } from "../types/Investment";

// Get all investments
export const getInvestments = () => http.get("/investments");

// Get single investment by ID
export const getInvestmentById = (id: string) => http.get(`/investments/${id}`);

// Create new investment
export const createInvestment = (data: Omit<Investment, "id">) =>
  http.post("/investments", data);

// Update investment
export const updateInvestment = (id: string, data: Omit<Investment, "id">) =>
  http.put(`/investments/${id}`, data);

// Delete investment
export const deleteInvestment = (id: string) =>
  http.delete(`/investments/${id}`);
