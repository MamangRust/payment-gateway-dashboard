import { FindByUser } from "@/types/domain/request/card/user";
import {
  CreateCard,
  FindAllCard,
  FindByCardNumber,
  FindByIdCard,
  UpdateCard,
} from "../../domain/request";
import { Card } from "../../model/card";
import { FindByIdTrashed } from "@/types/domain/request/card/trashed";

export interface CardStore {
  cards: Card[] | null;
  card: Card | null;

  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };

  loadingGetCards: boolean;
  loadingGetCard: boolean;
  loadingGetCardByUser: boolean;
  loadingGetActiveCards: boolean;
  loadingGetCardByCardNumber: boolean;

  loadingCreateCard: boolean;
  loadingUpdateCard: boolean;
  loadingTrashedCard: boolean;

  errorGetCards: string | null;
  errorGetCard: string | null;
  errorGetCardByUser: string | null;
  errorGetActiveCards: string | null;
  errorGetCardByCardNumber: string | null;

  errorCreateCard: string | null;
  errorUpdateCard: string | null;
  errorTrashedCard: string | null;

  setErrorGetCards: (value: string | null) => void;
  setErrorGetCard: (value: string | null) => void;
  setErrorGetCardByUser: (value: string | null) => void;
  setErrorGetActiveCards: (value: string | null) => void;
  setErrorGetCardByCardNumber: (value: string | null) => void;

  setErrorCreateCard: (value: string | null) => void;
  setErrorUpdateCard: (value: string | null) => void;
  setErrorTrashedCard: (value: string | null) => void;

  setLoadingGetCards: (value: boolean) => void;
  setLoadingGetCard: (value: boolean) => void;
  setLoadingGetCardByUser: (value: boolean) => void;
  setLoadingGetActiveCards: (value: boolean) => void;
  setLoadingGetCardByCardNumber: (value: boolean) => void;

  setLoadingCreateCard: (value: boolean) => void;
  setLoadingUpdateCard: (value: boolean) => void;
  setLoadingTrashedCard: (value: boolean) => void;

  findAllCards: (req: FindAllCard) => Promise<void>;
  findByIdCard: (req: FindByIdCard) => Promise<void>;

  findByUser: (req: FindByUser) => Promise<void>;
  findByCardNumber: (req: FindByCardNumber) => Promise<void>;

  findByActiveCard: (
    search: string,
    page: number,
    pageSize: number,
  ) => Promise<void>;

  createCard: (req: CreateCard) => Promise<boolean>;
  updateCard: (req: UpdateCard) => Promise<boolean>;
  trashedCard: (req: FindByIdTrashed) => Promise<boolean>;
}
