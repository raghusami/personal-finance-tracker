// types/Investment.ts
export interface Investment {
  id: number;
  date: string;
  investmentType: string; // e.g., Mutual Fund, Stocks, SGB
  platform: string;       // e.g., Zerodha, Groww
  amount: number;
  description: string;
}
