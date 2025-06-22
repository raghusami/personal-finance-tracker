import http from "../services/httpService";
import type { Saving } from "../types/Saving";  

const ENDPOINT = "/savings";

export const getSavings = () => http.get<Saving[]>(ENDPOINT);
export const getSavingById = (id: number | string) => http.get<Saving>(`${ENDPOINT}/${id}`);
export const createSaving = (data: Omit<Saving, "id">) => http.post(ENDPOINT, data);
export const updateSaving = (id: number | string, data: Saving) => http.put(`${ENDPOINT}/${id}`, data);
export const deleteSaving = (id: number | string) => http.delete(`${ENDPOINT}/${id}`);