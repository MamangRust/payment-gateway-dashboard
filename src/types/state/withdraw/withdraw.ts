import {
  CreateWithdraw,
  FindByCardNumberWithdraw,
  FindByIdWithdraw,
  TrashedWithdraw,
  UpdateWithdraw,
} from "@/types/domain/request";
import { FindByCardNumber } from "@/types/domain/request/saldo";
import { FindAllWithdraw } from "@/types/domain/request/withdraw/list";
import { Withdraw } from "@/types/model/withdraw";

export interface WithdrawStore {
  withdraws: Withdraw[] | null;
  withdraw: Withdraw | null;

  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };

  loadingGetWithdraws: boolean;
  loadingGetWithdraw: boolean;
  loadingGetCardNumberWithdraw: boolean;
  loadingGetActiveWithdraw: boolean;
  loadingGetTrashedWithdraw: boolean;

  loadingCreateWithdraw: boolean;
  loadingUpdateWithdraw: boolean;
  loadingTrashedWithdraw: boolean;

  // Error states
  errorGetWithdraws: string | null;
  errorGetWithdraw: string | null;
  errorGetCardNumberWithdraw: string | null;
  errorGetActiveWithdraw: string | null;
  errorGetTrashedWithdraw: string | null;

  errorCreateWithdraw: string | null;
  errorUpdateWithdraw: string | null;
  errorTrashedWithdraw: string | null;

  setLoadingGetWithdraws: (value: boolean) => void;
  setLoadingGetWithdraw: (value: boolean) => void;
  setLoadingGetCardNumberWithdraw: (value: boolean) => void;
  setLoadingGetActiveWithdraw: (value: boolean) => void;
  setLoadingGetTrashedWithdraw: (value: boolean) => void;

  setLoadingCreateWithdraw: (value: boolean) => void;
  setLoadingUpdateWithdraw: (value: boolean) => void;
  setLoadingTrashedWithdraw: (value: boolean) => void;

  setErrorGetWithdraws: (value: string | null) => void;
  setErrorGetWithdraw: (value: string | null) => void;
  setErrorGetCardNumberWithdraw: (value: string | null) => void;
  setErrorGetActiveWithdraw: (value: string | null) => void;
  setErrorGetTrashedWithdraw: (value: string | null) => void;

  setErrorCreateWithdraw: (value: string | null) => void;
  setErrorUpdateWithdraw: (value: string | null) => void;
  setErrorTrashedWithdraw: (value: string | null) => void;

  findAllWithdraws: (req: FindAllWithdraw) => Promise<void>;
  findByIdWithdraw: (req: FindByIdWithdraw) => Promise<void>;
  findByCardNumberWithdraw: (req: FindByCardNumberWithdraw) => Promise<void>;
  findByActiveWithdraw: (
    search: string,
    page: number,
    pageSize: number,
  ) => Promise<void>;
  createWithdraw: (req: CreateWithdraw) => Promise<boolean>;
  updateWithdraw: (req: UpdateWithdraw) => Promise<boolean>;
  trashedWithdraw: (req: TrashedWithdraw) => Promise<boolean>;
}
