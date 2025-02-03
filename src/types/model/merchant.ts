import { PaginationMeta } from "./card";

export interface Merchant {
  id: number;
  name: string;
  api_key: string;
  user_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MerchantTrashed extends Merchant {
  deleted_at: string;
}

export interface MerchantTransaction {
  id: number;
  card_number: string;
  amount: number;
  payment_method: string;
  merchant_id: number;
  merchant_name: string;
  transaction_time: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface MerchantMonthlyPaymentMethod {
  month: string;
  payment_method: string;
  total_amount: number;
}

export interface MerchantYearlyPaymentMethod {
  year: string;
  payment_method: string;
  total_amount: number;
}

export interface MerchantMonthlyAmount {
  month: string;
  total_amount: number;
}

export interface MerchantYearlyAmount {
  year: string;
  total_amount: number;
}

export interface MerchantMonthlyTotalAmount {
  month: string;
  year: string;
  total_amount: number;
}

export interface MerchantYearlyTotalAmount {
  year: string;
  total_amount: number;
}

export interface ApiResponseMerchantMonthlyPaymentMethod {
  status: string;
  message: string;
  data: MerchantMonthlyPaymentMethod[];
}

export interface ApiResponseMerchantYearlyPaymentMethod {
  status: string;
  message: string;
  data: MerchantYearlyPaymentMethod[];
}

export interface ApiResponseMerchantMonthlyAmount {
  status: string;
  message: string;
  data: MerchantMonthlyAmount[];
}

export interface ApiResponseMerchantYearlyAmount {
  status: string;
  message: string;
  data: MerchantYearlyAmount[];
}

export interface ApiResponseMerchantMonthlyTotalAmount {
  status: string;
  message: string;
  data: MerchantMonthlyTotalAmount[];
}

export interface ApiResponseMerchantYearlyTotalAmount {
  status: string;
  message: string;
  data: MerchantYearlyTotalAmount[];
}

export interface ApiResponsesMerchant {
  status: string;
  message: string;
  data: Merchant[];
}

export interface ApiResponseMerchant {
  status: string;
  message: string;
  data: Merchant;
}

export interface ApiResponseMerchantDelete {
  status: string;
  message: string;
}

export interface ApiResponseMerchantAll {
  status: string;
  message: string;
}

export interface ApiResponsePaginationMerchant {
  status: string;
  message: string;
  data: Merchant[];
  pagination: PaginationMeta;
}

export interface ApiResponsePaginationMerchantDeleteAt {
  status: string;
  message: string;
  data: MerchantTrashed[];
  pagination: PaginationMeta;
}

export interface ApiResponsePaginationMerchantTransaction {
  status: string;
  message: string;
  data: MerchantTransaction[];
  pagination: PaginationMeta;
}
