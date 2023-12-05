export interface Client {
  name: string;
  email: string;
  expenses: Report[];
  password: string;
  role: 'user' | 'admin';
}

export interface Report {
  created: Date | string; 
  type: string;
  amount?: number;
  receipt: boolean;
  approval?: boolean;
  reimbursement?: number;
}

export function calculateAdminReimbursement(expense: Report): number {
  const maxReimbursement = 30;

  if (expense.receipt && expense.amount && expense.amount > maxReimbursement) {
    return maxReimbursement;
  } else {
    return expense.amount || 0;
  }
}

