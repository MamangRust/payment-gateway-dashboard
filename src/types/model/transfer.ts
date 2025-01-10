export interface Transfer {
  id: number;
  transfer_from: string;
  transfer_to: string;
  transfer_amount: number;
  transfer_time: string;
  created_at: string;
  updated_at: string;
}

export interface TransferTrashed {
  id: number;
  transfer_from: string;
  transfer_to: string;
  transfer_amount: number;
  transfer_time: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
