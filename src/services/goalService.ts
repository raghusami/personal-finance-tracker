import http from "../services/httpService";
import { Goal } from "../types/Goal";

const ENDPOINT = "/goals";


export const getGoals = () => http.get<Goal[]>(ENDPOINT);

export const getGoalById = (id: string | number) => http.get<Goal>(`${ENDPOINT}/${id}`);

export const createGoal = (data: Omit<Goal, "id">) =>http.post(ENDPOINT, data);

export const updateGoal = (id: string | number, data: Omit<Goal, "id">) =>http.put(`${ENDPOINT}/${id}`, data);

export const deleteGoal = (id: string | number) => http.delete(`${ENDPOINT}/${id}`);
