export interface Topup {
  id: number;
  card_number: string;
  topup_no: string;
  topup_amount: string;
  topup_time: string;
  created_at: string;
  updated_at: string;
}

export interface TopupTrashed {
  id: number;
  card_number: string;
  topup_no: string;
  topup_amount: string;
  topup_time: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
