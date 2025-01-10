export interface Card {
  id: number;
  user_id: number;
  card_number: string;
  card_type: string;
  expire_date: string;
  cvv: string;
  card_provider: string;
  created_at: string;
  updated_at: string;
}

export interface CardTrashed {
  id: number;
  user_id: number;
  card_number: string;
  card_type: string;
  expire_date: string;
  cvv: string;
  card_provider: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
