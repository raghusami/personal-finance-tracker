// services/UserService.ts
import http from "../services/httpService";
import type { UserProfile } from "../types/UserProfile";

const ENDPOINT = "/users";

export const getUsers = () => http.get<UserProfile[]>(ENDPOINT);

export const getUserById = (id: string) =>
  http.get<UserProfile>(`${ENDPOINT}/${id}`);

export const createUser = (data: UserProfile) =>
  http.post<UserProfile>(ENDPOINT, data);

export const updateUser = (id: string, data: Partial<UserProfile>) =>
  http.put<UserProfile>(`${ENDPOINT}/${id}`, data);

export const deleteUser = (id: string) =>
  http.delete(`${ENDPOINT}/${id}`);
