// services/salaryService.ts
import http from "../services/httpService";
import type { Salary } from "../types/Salary";

const ENDPOINT = "/salaries";

export const getSalaries = () => http.get<Salary[]>(ENDPOINT);
export const getSalaryById = (id: number | string) => http.get<Salary>(`${ENDPOINT}/${id}`);
export const createSalary = (data: Omit<Salary, "id">) => http.post(ENDPOINT, data);
export const updateSalary = (id: number | string, data: Salary) => http.put(`${ENDPOINT}/${id}`, data);
export const deleteSalary = (id: number | string) => http.delete(`${ENDPOINT}/${id}`);
