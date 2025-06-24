export interface BudgetPeriod {
  id: string;
  fromDate: string; // ISO date string
  toDate: string;
  category: string;
  amount: number;
  notes?: string;
  durationType?: "monthly" | "quarterly" | "custom";
}
