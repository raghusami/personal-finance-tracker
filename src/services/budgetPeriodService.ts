import http from "../services/httpService";
import { BudgetPeriod } from "../types/BudgetPeriod";

const ENDPOINT = "/budgets";

export const getBudgetPeriods = () => http.get<BudgetPeriod[]>(ENDPOINT);   
export const getBudgetPeriodById = (id: string | number) => http.get<BudgetPeriod>(`${ENDPOINT}/${id}`);
export const createBudgetPeriod = (data: Omit<BudgetPeriod, "id">) => http.post(ENDPOINT, data);
export const updateBudgetPeriod = (id: string | number, data: Omit<BudgetPeriod, "id">) => http.put(`${ENDPOINT}/${id}`, data);
export const deleteBudgetPeriod = (id: string | number) => http.delete(`${ENDPOINT}/${id}`);    
