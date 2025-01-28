import { PaginationMeta } from "./card";

export interface Withdraw {
  withdraw_id: number;
  card_number: string;
  withdraw_amount: number;
  withdraw_time: Date;
  created_at: string;
  updated_at: string;
}

export interface WithdrawTrashed {
  withdraw_id: number;
  card_number: string;
  withdraw_amount: number;
  withdraw_time: Date;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface WithdrawMonthStatusSuccess {
  year: string;
  month: string;
  total_amount: number;
  total_success: number;
}

export interface WithdrawYearStatusSuccess {
  year: string;
  total_amount: number;
  total_success: number;
}

export interface WithdrawMonthStatusFailed {
  year: string;
  month: string;
  total_amount: number;
  total_failed: number;
}

export interface WithdrawYearStatusFailed {
  year: string;
  total_amount: number;
  total_failed: number;
}

export interface WithdrawMonthlyAmount {
  month: string;
  total_amount: number;
}

export interface WithdrawYearlyAmount {
  year: string;
  total_amount: number;
}

export interface ApiResponseWithdrawMonthStatusSuccess {
  status: string;
  message: string;
  data: WithdrawMonthStatusSuccess[];
}

export interface ApiResponseWithdrawYearStatusSuccess {
  status: string;
  message: string;
  data: WithdrawYearStatusSuccess[];
}

export interface ApiResponseWithdrawMonthStatusFailed {
  status: string;
  message: string;
  data: WithdrawMonthStatusFailed[];
}

export interface ApiResponseWithdrawYearStatusFailed {
  status: string;
  message: string;
  data: WithdrawYearStatusFailed[];
}

export interface ApiResponseWithdrawMonthAmount {
  status: string;
  message: string;
  data: WithdrawMonthlyAmount[];
}

export interface ApiResponseWithdrawYearAmount {
  status: string;
  message: string;
  data: WithdrawYearlyAmount[];
}

export interface ApiResponsesWithdraw {
  status: string;
  message: string;
  data: Withdraw[];
}

export interface ApiResponseWithdraw {
  status: string;
  message: string;
  data?: Withdraw;
}

export interface ApiResponseWithdrawDelete {
  status: string;
  message: string;
}

export interface ApiResponseWithdrawAll {
  status: string;
  message: string;
}

export interface ApiResponsePaginationWithdraw {
  status: string;
  message: string;
  data: Withdraw[];
  pagination: PaginationMeta;
}

export interface ApiResponsePaginationWithdrawDeleteAt {
  status: string;
  message: string;
  data: WithdrawTrashed[];
  pagination: PaginationMeta;
}
