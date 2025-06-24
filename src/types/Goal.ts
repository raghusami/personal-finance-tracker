export interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  status: "Not Started" | "In Progress" | "Completed" | "Cancelled";
  notes?: string;
  userId: string; // Reference to the user who owns this goal
}
 