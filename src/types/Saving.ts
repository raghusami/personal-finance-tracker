export interface Saving {
  id: number | string;

  // Core Fields
  date: string;                  // Format: YYYY-MM-DD
  title: string;                 // E.g., "March SIP - Axis Bluechip"
  amount: number;                // Saved amount
  currency: string;             // Default: "INR"
  savingType: "Recurring" | "One-time";
  category: string;             // E.g., "SIP", "FD", "Cash", etc.
  account?: string;             // E.g., "HDFC Bank", "Groww", "Cash"

  // Goal/Plan Fields (Optional)
  goalName?: string;            // E.g., "Vacation 2025", "Retirement"
  targetAmount?: number;        // E.g., 100000 for a goal
  targetDate?: string;          // Format: YYYY-MM-DD
  isGoalCompleted?: boolean;    // If savings goal reached

  // Interest/Maturity (Optional)
  interestRate?: number;        // E.g., 6.5 (in %)
  maturityDate?: string;        // E.g., for FDs or RDs
   // 🆕 New fields
  interestAmount: number,
  numberOfMonths: number,
  vendorName: string,

  // Other
  notes?: string;
  createdAt?: string;           // ISO timestamp
  updatedAt?: string;           // ISO timestamp
}
