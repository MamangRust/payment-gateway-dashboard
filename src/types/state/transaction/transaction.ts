import {
  CreateTransaction,
  FindAllTransaction,
  FindyByCardNumberTransaction,
  FindyByIdTransaction,
  FindyByMerchantTransaction,
  TrashedTransaction,
  UpdateTransaction,
} from "../../domain/request";
import { Transaction } from "../../model/transaction";

export interface TransactionStore {
  transactions: Transaction[] | null;
  transaction: Transaction | null;

  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };

  loadingGetTransactions: boolean;
  loadingGetTransaction: boolean;
  loadingGetCardNumberTransaction: boolean;
  loadingGetMerchantTransaction: boolean;
  loadingGetActiveTransaction: boolean;
  loadingGetTrashedTransaction: boolean;

  loadingCreateTransaction: boolean;
  loadingUpdateTransaction: boolean;
  loadingTrashedTransaction: boolean;

  errorGetTransactions: string | null;
  errorGetTransaction: string | null;
  errorGetCardNumberTransaction: string | null;
  errorGetMerchantTransaction: string | null;
  errorGetActiveTransaction: string | null;
  errorGetTrashedTransaction: string | null;

  errorCreateTransaction: string | null;
  errorUpdateTransaction: string | null;
  errorTrashedTransaction: string | null;

  setLoadingGetTransactions: (value: boolean) => void;
  setLoadingGetTransaction: (value: boolean) => void;
  setLoadingGetCardNumberTransaction: (value: boolean) => void;
  setLoadingGetMerchantTransaction: (value: boolean) => void;
  setLoadingGetActiveTransaction: (value: boolean) => void;
  setLoadingGetTrashedTransaction: (value: boolean) => void;

  setLoadingCreateTransaction: (value: boolean) => void;
  setLoadingUpdateTransaction: (value: boolean) => void;
  setLoadingTrashedTransaction: (value: boolean) => void;

  setErrorGetTransactions: (value: string | null) => void;
  setErrorGetTransaction: (value: string | null) => void;
  setErrorGetCardNumberTransaction: (value: string | null) => void;
  setErrorGetMerchantTransaction: (value: string | null) => void;
  setErrorGetActiveTransaction: (value: string | null) => void;
  setErrorGetTrashedTransaction: (value: string | null) => void;

  setErrorCreateTransaction: (value: string | null) => void;
  setErrorUpdateTransaction: (value: string | null) => void;
  setErrorTrashedTransaction: (value: string | null) => void;

  findAllTransactions: (req: FindAllTransaction) => Promise<void>;
  findByIdTransaction: (req: FindyByIdTransaction) => Promise<void>;
  findByCardNumberTransaction: (
    req: FindyByCardNumberTransaction,
  ) => Promise<void>;
  findByMerchantTransaction: (req: FindyByMerchantTransaction) => Promise<void>;
  findByActiveTransaction: (
    search: string,
    page: number,
    pageSize: number,
  ) => Promise<void>;
  createTransaction: (req: CreateTransaction) => Promise<boolean>;
  updateTransaction: (req: UpdateTransaction) => Promise<boolean>;
  trashedTransaction: (req: TrashedTransaction) => Promise<boolean>;
}
