export interface Transaction {
  id: number;
  card_number: string;
  amount: number;
  payment_method: string;
  transaction_time: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionTrashed {
  id: number;
  card_number: string;
  amount: number;
  payment_method: string;
  transaction_time: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
