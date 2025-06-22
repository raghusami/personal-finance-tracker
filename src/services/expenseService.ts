// services ExpenseService.ts
import http from "../services/httpService";
import type { Expense } from "../types/Expense";
const ENDPOINT = "/expenses";

export const getExpenses = () => http.get<Expense[]>(ENDPOINT);
export const getExpenseById = (id: number | string) => http.get<Expense>(`${ENDPOINT}/${id}`);
export const createExpense = (data: Omit<Expense, "id">) => http.post(ENDPOINT, data);
export const updateExpense = (id: number | string, data: Expense) => http.put(`${ENDPOINT}/${id}`, data);
export const deleteExpense = (id: number | string) => http.delete(`${ENDPOINT}/${id}`);