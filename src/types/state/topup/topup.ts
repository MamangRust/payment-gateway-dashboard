import {
  CreateTopup,
  FindAllTopup,
  FindByIdTopup,
  UpdateTopup,
} from "@/types/domain/request/topup";
import { Topup } from "../../model/topup";
import { FindByCardNumberTopup } from "@/types/domain/request/topup/findByCardNumber";
import { TrashedTopup } from "@/types/domain/request/topup/trashed";

export interface TopupStore {
  topups: Topup[] | null;
  topup: Topup | null;

  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };

  loadingGetTopups: boolean;
  loadingGetTopup: boolean;
  loadingGetActiveTopup: boolean;
  loadingGetTrashedTopup: boolean;
  loadingGetCardNumberTopup: boolean;

  loadingCreateTopup: boolean;
  loadingUpdateTopup: boolean;
  loadingTrashedTopup: boolean;

  errorGetTopups: string | null;
  errorGetTopup: string | null;
  errorGetActiveTopup: string | null;
  errorGetTrashedTopup: string | null;
  errorGetCardNumberTopup: string | null;

  errorCreateTopup: string | null;
  errorUpdateTopup: string | null;
  errorTrashedTopup: string | null;

  setLoadingGetTopups: (value: boolean) => void;
  setLoadingGetTopup: (value: boolean) => void;
  setLoadingGetActiveTopup: (value: boolean) => void;
  setLoadingGetTrashedTopup: (value: boolean) => void;
  setLoadingGetCardNumberTopup: (value: boolean) => void;

  setLoadingCreateTopup: (value: boolean) => void;
  setLoadingUpdateTopup: (value: boolean) => void;
  setLoadingTrashedTopup: (value: boolean) => void;

  setErrorGetTopups: (value: string | null) => void;
  setErrorGetTopup: (value: string | null) => void;
  setErrorGetActiveTopup: (value: string | null) => void;
  setErrorGetTrashedTopup: (value: string | null) => void;
  setErrorGetCardNumberTopup: (value: string | null) => void;

  setErrorCreateTopup: (value: string | null) => void;
  setErrorUpdateTopup: (value: string | null) => void;
  setErrorTrashedTopup: (value: string | null) => void;

  findAllTopups: (req: FindAllTopup) => Promise<void>;
  findByIdTopup: (req: FindByIdTopup) => Promise<void>;
  findByActiveTopup: (
    search: string,
    page: number,
    pageSize: number,
  ) => Promise<void>;
  findByCardNumberTopup: (req: FindByCardNumberTopup) => Promise<void>;
  createTopup: (req: CreateTopup) => Promise<boolean>;
  updateTopup: (req: UpdateTopup) => Promise<boolean>;
  trashedTopup: (req: TrashedTopup) => Promise<boolean>;
}
