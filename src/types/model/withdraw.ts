export interface Withdraw {
  id: number;
  card_number: string;
  withdraw_amount: number;
  withdraw_time: string;
  created_at: string;
  updated_at: string;
}

export interface WithdrawTrashed {
  id: number;
  card_number: string;
  withdraw_amount: number;
  withdraw_time: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
