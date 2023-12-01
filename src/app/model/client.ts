export interface Client {
    name: string;
    email: string;
    expenses: Report[];
    password: string;
  }

  export interface Report {
    created: Date;
    type: string;
    amount?: number;
    receipt: boolean;
    
  }