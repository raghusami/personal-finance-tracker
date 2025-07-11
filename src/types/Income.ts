// types/Salary.ts
export interface Income {
  id: number;
  incomeDate: string; // ISO format (e.g. "2025-06-18")
  incomeSource: string; // e.g. "Company", "Freelance", etc.
  amount: number; // Amount earned
  notes?: string; // Any additional comments
  currency: string; // e.g. "USD", "INR"
  incomeType?:string; // e.g. "Primary", "Secondary", "Freelance", "Bonus"
}
