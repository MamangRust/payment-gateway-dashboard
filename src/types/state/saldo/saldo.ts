import { Saldo } from "@/types/model/saldo";
import {
  CreateSaldo,
  FindAllSaldo,
  FindByIdSaldo,
  UpdateSaldo,
} from "@/types/domain/request";
import { FindByCardNumber, TrashedSaldo } from "@/types/domain/request/saldo";

export interface SaldoStore {
  saldos: Saldo[] | null;
  saldo: Saldo | null;

  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };

  loadingGetSaldos: boolean;
  loadingGetSaldo: boolean;
  loadingGetActiveSaldo: boolean;
  loadingGetTrashedSaldo: boolean;
  loadingGetCardNumberSaldo: boolean;

  loadingCreateSaldo: boolean;
  loadingUpdateSaldo: boolean;
  loadingTrashedSaldo: boolean;

  errorGetSaldos: string | null;
  errorGetSaldo: string | null;
  errorGetActiveSaldo: string | null;
  errorGetTrashedSaldo: string | null;
  errorGetCardNumberSaldo: string | null;

  errorCreateSaldo: string | null;
  errorUpdateSaldo: string | null;
  errorTrashedSaldo: string | null;

  setLoadingGetSaldos: (value: boolean) => void;
  setLoadingGetSaldo: (value: boolean) => void;
  setLoadingGetActiveSaldo: (value: boolean) => void;
  setLoadingGetTrashedSaldo: (value: boolean) => void;
  setLoadingGetCardNumberSaldo: (value: boolean) => void;

  setLoadingCreateSaldo: (value: boolean) => void;
  setLoadingUpdateSaldo: (value: boolean) => void;
  setLoadingTrashedSaldo: (value: boolean) => void;

  setErrorGetSaldos: (value: string | null) => void;
  setErrorGetSaldo: (value: string | null) => void;
  setErrorGetActiveSaldo: (value: string | null) => void;
  setErrorGetTrashedSaldo: (value: string | null) => void;
  setErrorGetCardNumberSaldo: (value: string | null) => void;

  setErrorCreateSaldo: (value: string | null) => void;
  setErrorUpdateSaldo: (value: string | null) => void;
  setErrorTrashedSaldo: (value: string | null) => void;

  findAllSaldos: (req: FindAllSaldo) => Promise<void>;
  findByIdSaldo: (req: FindByIdSaldo) => Promise<void>;
  findByActiveSaldo: (
    search: string,
    page: number,
    pageSize: number,
  ) => Promise<void>;
  findByCardNumberSaldo: (req: FindByCardNumber) => Promise<void>;
  createSaldo: (req: CreateSaldo) => Promise<boolean>;
  updateSaldo: (req: UpdateSaldo) => Promise<boolean>;
  trashedSaldo: (req: TrashedSaldo) => Promise<boolean>;
}
