export interface UpdateCard {
  user_id: number;
  card_type: string;
  expire_date: Date;
  cvv: string;
  card_provider: string;
}
