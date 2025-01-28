import { PaginationMeta } from "./card";

export interface Transaction {
  id: number;
  card_number: string;
  amount: number;
  merchant_id: number;
  payment_method: string;
  transaction_time: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionTrashed extends Transaction {
  deleted_at: string;
}

export interface TransactionMonthStatusSuccess {
  year: string;
  month: string;
  total_amount: number;
  total_success: number;
}

export interface TransactionYearStatusSuccess {
  year: string;
  total_amount: number;
  total_success: number;
}

export interface TransactionMonthStatusFailed {
  year: string;
  month: string;
  total_amount: number;
  total_failed: number;
}

export interface TransactionYearStatusFailed {
  year: string;
  total_amount: number;
  total_failed: number;
}

export interface TransactionMonthMethod {
  month: string;
  payment_method: string;
  total_transactions: number;
  total_amount: number;
}

export interface TransactionYearMethod {
  year: string;
  payment_method: string;
  total_transactions: number;
  total_amount: number;
}

export interface TransactionMonthAmount {
  month: string;
  total_amount: number;
}

export interface TransactionYearlyAmount {
  year: string;
  total_amount: number;
}

export interface ApiResponseTransactionMonthStatusSuccess {
  status: string;
  message: string;
  data: TransactionMonthStatusSuccess[];
}

export interface ApiResponseTransactionYearStatusSuccess {
  status: string;
  message: string;
  data: TransactionYearStatusSuccess[];
}

export interface ApiResponseTransactionMonthStatusFailed {
  status: string;
  message: string;
  data: TransactionMonthStatusFailed[];
}

export interface ApiResponseTransactionYearStatusFailed {
  status: string;
  message: string;
  data: TransactionYearStatusFailed[];
}

export interface ApiResponseTransactionMonthMethod {
  status: string;
  message: string;
  data: TransactionMonthMethod[];
}

export interface ApiResponseTransactionYearMethod {
  status: string;
  message: string;
  data: TransactionYearMethod[];
}

export interface ApiResponseTransactionMonthAmount {
  status: string;
  message: string;
  data: TransactionMonthAmount[];
}

export interface ApiResponseTransactionYearAmount {
  status: string;
  message: string;
  data: TransactionYearlyAmount[];
}

export interface ApiResponseTransaction {
  status: string;
  message: string;
  data?: Transaction;
}

export interface ApiResponseTransactions {
  status: string;
  message: string;
  data: Transaction[];
}

export interface ApiResponseTransactionDelete {
  status: string;
  message: string;
}

export interface ApiResponseTransactionAll {
  status: string;
  message: string;
}

export interface ApiResponsePaginationTransaction {
  status: string;
  message: string;
  data: Transaction[];
  pagination: PaginationMeta;
}

export interface ApiResponsePaginationTransactionDeleteAt {
  status: string;
  message: string;
  data: TransactionTrashed[];
  pagination: PaginationMeta;
}
