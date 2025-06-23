export interface UserProfile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobileNumber: string;
  username: string;
  password: string;
  isCoupleModeEnabled: boolean;
  preferredCurrency: string;
  incomeGoal?: number;
  savingGoal?: number;
  investmentGoal?: number;
}