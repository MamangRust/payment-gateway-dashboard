export interface Merchant {
  id: number;
  name: string;
  api_key: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MerchantTrashed {
  id: number;
  name: string;
  api_key: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
