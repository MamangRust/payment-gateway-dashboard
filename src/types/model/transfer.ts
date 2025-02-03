import { PaginationMeta } from "./card";

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

export interface TransferMonthStatusSuccess {
  year: string;
  month: string;
  total_amount: number;
  total_success: number;
}

export interface TransferYearStatusSuccess {
  year: string;
  total_amount: number;
  total_success: number;
}

export interface TransferMonthStatusFailed {
  year: string;
  month: string;
  total_amount: number;
  total_failed: number;
}

export interface TransferYearStatusFailed {
  year: string;
  total_amount: number;
  total_failed: number;
}

export interface TransferMonthAmount {
  month: string;
  total_amount: number;
}

export interface TransferYearAmount {
  year: string;
  total_amount: number;
}

export interface ApiResponseTransferMonthStatusSuccess {
  status: string;
  message: string;
  data: TransferMonthStatusSuccess[];
}

export interface ApiResponseTransferYearStatusSuccess {
  status: string;
  message: string;
  data: TransferYearStatusSuccess[];
}

export interface ApiResponseTransferMonthStatusFailed {
  status: string;
  message: string;
  data: TransferMonthStatusFailed[];
}

export interface ApiResponseTransferYearStatusFailed {
  status: string;
  message: string;
  data: TransferYearStatusFailed[];
}

export interface ApiResponseTransferMonthAmount {
  status: string;
  message: string;
  data: TransferMonthAmount[];
}

export interface ApiResponseTransferYearAmount {
  status: string;
  message: string;
  data: TransferYearAmount[];
}

export interface ApiResponseTransfer {
  status: string;
  message: string;
  data?: Transfer;
}

export interface ApiResponseTransfers {
  status: string;
  message: string;
  data: Transfer[];
}

export interface ApiResponseTransferDelete {
  status: string;
  message: string;
}

export interface ApiResponseTransferAll {
  status: string;
  message: string;
}

export interface ApiResponsePaginationTransfer {
  status: string;
  message: string;
  data: Transfer[];
  pagination: PaginationMeta;
}

export interface ApiResponsePaginationTransferDeleteAt {
  status: string;
  message: string;
  data: TransferTrashed[];
  pagination: PaginationMeta;
}
