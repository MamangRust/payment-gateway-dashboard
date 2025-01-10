export interface Saldo {
  id: number;
  card_number: string;
  total_balance: number;
  withdraw_time: string;
  withdraw_amount: number;
  created_at: string;
  updated_at: string;
}

export interface SaldoTrashed {
  id: number;
  card_number: string;
  total_balance: number;
  withdraw_time: string;
  withdraw_amount: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
