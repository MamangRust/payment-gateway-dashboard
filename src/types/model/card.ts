export interface Card {
  id: number;
  user_id: number;
  card_number: string;
  card_type: string;
  expire_date: Date;
  cvv: string;
  card_provider: string;
  created_at: string;
  updated_at: string;
}

export interface CardTrashed extends Card {
  deleted_at: string;
}

export interface DashboardCard {
  total_balance?: number | null;
  total_topup?: number | null;
  total_withdraw?: number | null;
  total_transaction?: number | null;
  total_transfer?: number | null;
}

export interface DashboardCardCardNumber {
  total_balance?: number | null;
  total_topup?: number | null;
  total_withdraw?: number | null;
  total_transaction?: number | null;
  total_transfer_send?: number | null;
  total_transfer_receiver?: number | null;
}

export interface CardMonthBalance {
  month: string;
  total_balance: number;
}

export interface CardYearlyBalance {
  year: string;
  total_balance: number;
}

export interface CardMonthTopupAmount {
  month: string;
  total_amount: number;
}

export interface CardYearlyTopupAmount {
  year: string;
  total_amount: number;
}

export interface CardMonthTransactionAmount {
  month: string;
  total_amount: number;
}

export interface CardYearlyTransactionAmount {
  year: string;
  total_amount: number;
}

export interface CardMonthTransferAmount {
  month: string;
  total_amount: number;
}

export interface CardYearlyTransferAmount {
  year: string;
  total_amount: number;
}

export interface CardMonthWithdrawAmount {
  month: string;
  total_amount: number;
}

export interface CardYearlyWithdrawAmount {
  year: string;
  total_amount: number;
}

export interface ApiResponseCard {
  status: string;
  message: string;
  data?: Card;
}

export interface ApiResponseCardDelete {
  status: string;
  message: string;
}

export interface ApiResponseCardAll {
  status: string;
  message: string;
}

export interface ApiResponsePaginationCard {
  status: string;
  message: string;
  data?: Card[];
  pagination?: PaginationMeta;
}

export interface ApiResponsePaginationCardDeleteAt {
  status: string;
  message: string;
  data?: CardTrashed[];
  pagination?: PaginationMeta;
}

export interface ApiResponseMonthlyBalance {
  status: string;
  message: string;
  data?: CardMonthBalance[];
}

export interface ApiResponseYearlyBalance {
  status: string;
  message: string;
  data?: CardYearlyBalance[];
}

export interface ApiResponseDashboardCard {
  status: string;
  message: string;
  data?: DashboardCard;
}

export interface ApiResponseDashboardCardNumber {
  status: string;
  message: string;
  data?: DashboardCardCardNumber;
}

export interface PaginationMeta {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_records: number;
}

export interface ApiResponseMonthlyTopupAmount {
  status: string;
  message: string;
  data?: CardMonthTopupAmount[];
}

export interface ApiResponseYearlyTopupAmount {
  status: string;
  message: string;
  data?: CardYearlyTopupAmount[];
}

export interface ApiResponseMonthlyTransactionAmount {
  status: string;
  message: string;
  data?: CardMonthTransactionAmount[];
}

export interface ApiResponseYearlyTransactionAmount {
  status: string;
  message: string;
  data?: CardYearlyTransactionAmount[];
}

export interface ApiResponseMonthlyTransferAmount {
  status: string;
  message: string;
  data?: CardMonthTransferAmount[];
}

export interface ApiResponseYearlyTransferAmount {
  status: string;
  message: string;
  data?: CardYearlyTransferAmount[];
}

export interface ApiResponseMonthlyWithdrawAmount {
  status: string;
  message: string;
  data?: CardMonthWithdrawAmount[];
}

export interface ApiResponseYearlyWithdrawAmount {
  status: string;
  message: string;
  data?: CardYearlyWithdrawAmount[];
}
