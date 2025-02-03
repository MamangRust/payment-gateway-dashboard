export interface FindAllMerchant {
  search: string;
  page: number;
  page_size: number;
  toast: any;
}

export interface FindAllMerchantTransaction {
  merchant_id: number;
  search: string;
  page: number;
  page_size: number;
  toast: any;
}
