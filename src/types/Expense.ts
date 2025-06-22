export interface Expense {
  id: number;
  date: string;             // Format: "YYYY-MM-DD"
  category: string;         // Main category, e.g. "Housing"
  subcategory?: string;     // Optional: e.g. "Rent", "Electricity"
  description: string;      // Description of the expense
  type: "Expense";          // Useful for chart filtering or type-safe operations
  amount: number;           // Spent amount

  // Optional metadata
  currency?: string;        // Default: "INR"
  createdAt?: string;       // ISO timestamp
  updatedAt?: string;       // ISO timestamp
}
