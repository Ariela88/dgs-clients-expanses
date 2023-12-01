export interface Client {
    name: string;
    email: string;
    expenses: Report[];
  }

  export interface Report {
    created: Date;
    type: string;
    amount?: number;
    receipt: boolean;
    
  }