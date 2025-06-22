// types/Salary.ts
export interface Salary {
  id: number;
  date: string; // ISO format (e.g. "2025-06-18")
  sourceOfIncome: string; // e.g. "Company", "Freelance", etc.
  amount: number; // Amount earned

  // 🔽 Recommended Optional Fields
  currency?: string; // e.g. "INR", "USD" (helps in multi-currency use cases)
  notes?: string; // Any additional comments
  type?: 'Primary' | 'Secondary' | 'Bonus' | 'Freelance'; // Helps in categorizing income
  createdAt?: string; // Timestamp for record creation
  updatedAt?: string; // Timestamp for last update
}
