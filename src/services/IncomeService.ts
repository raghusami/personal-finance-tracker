// services/salaryService.ts
import http from "../services/httpService";
import type { Income } from "../types/Income";

const ENDPOINT = "/IncomeRecords/";

// GET: Get all income records
export const getIncomes = () => http.get<Income[]>(`${ENDPOINT}IncomeGetAll`);

// GET: Get a single income record by ID
export const getIncomeById = (id: number | string) =>
  http.get<Income>(`${ENDPOINT}IncomeGetById/${id}`);

// POST: Create a new income record
export const createIncome = (data: Omit<Income, "id">) =>
  http.post(`${ENDPOINT}IncomeCreate`, data);

// PUT: Update an existing income record
export const updateIncome = (id: number | string, data: Income) =>
  http.put(`${ENDPOINT}IncomeUpdate/${id}`, data);

// DELETE: Delete an income record
export const deleteIncome = (id: number | string) =>
  http.delete(`${ENDPOINT}IncomeDelete/${id}`);