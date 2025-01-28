import { PaginationMeta } from "./card";

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

export interface SaldoMonthTotalBalance {
  month: string;
  year: string;
  total_balance: number;
}

export interface SaldoYearTotalBalance {
  year: string;
  total_balance: number;
}

export interface SaldoMonthBalance {
  month: string;
  total_balance: number;
}

export interface SaldoYearBalance {
  year: string;
  total_balance: number;
}

export interface ApiResponseSaldo {
  status: string;
  message: string;
  data: Saldo;
}

export interface ApiResponsesSaldo {
  status: string;
  message: string;
  data: Saldo[];
}

export interface ApiResponseSaldoDelete {
  status: string;
  message: string;
}

export interface ApiResponseSaldoAll {
  status: string;
  message: string;
}

export interface ApiResponseMonthTotalSaldo {
  status: string;
  message: string;
  data: SaldoMonthTotalBalance[];
}

export interface ApiResponseYearTotalSaldo {
  status: string;
  message: string;
  data: SaldoYearTotalBalance[];
}

export interface ApiResponseMonthSaldoBalances {
  status: string;
  message: string;
  data: SaldoMonthBalance[];
}

export interface ApiResponseYearSaldoBalances {
  status: string;
  message: string;
  data: SaldoYearBalance[];
}

export interface ApiResponsePaginationSaldo {
  status: string;
  message: string;
  data: Saldo[];
  pagination: PaginationMeta;
}

export interface ApiResponsePaginationSaldoDeleteAt {
  status: string;
  message: string;
  data: SaldoTrashed[];
  pagination: PaginationMeta;
}
