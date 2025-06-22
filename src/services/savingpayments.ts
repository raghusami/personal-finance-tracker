import http from "../services/httpService";
import type { SavingPayments } from '../types/SavingPayments';    

const ENDPOINT = '/savingpayments';

    export const getSavingPayments = () => http.get<SavingPayments[]>(ENDPOINT);
    export const getSavingPaymentById = (id: number | string) => http.get<SavingPayments>(`${ENDPOINT}/${id}`);
    export const createSavingPayment = (data: Omit<SavingPayments, 'id'>) => http.post(ENDPOINT, data);
    export const updateSavingPayment = (id: number | string, data: SavingPayments) => http.put(`${ENDPOINT}/${id}`, data);
    export const deleteSavingPayment = (id: number | string) => http.delete(`${ENDPOINT}/${id}`);