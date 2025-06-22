export interface SavingPayments  {
  id: number;
  savingId : number | string; // Reference to the Saving ID
  date: string; // Format: YYYY-MM-DD
  amount: number; // Payment amount
  status: "Pending" | "Completed" | "Failed"; // Payment status
  paymentMethod: string; // E.g., "Bank Transfer", "UPI", "Credit Card"
  notes?: string; // Optional notes about the payment   
}