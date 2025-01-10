import {
  FindAllTransfer,
  FindByIdTransfer,
  TransferFrom,
  TransferTo,
  CreateTransfer,
  UpdateTransfer,
  TrashedTransfer,
} from "@/types/domain/request";
import { Transfer } from "../../model/transfer";

export interface TransferStore {
  transfers: Transfer[] | null;
  transfer: Transfer | null;

  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };

  loadingGetTransfers: boolean;
  loadingGetTransfer: boolean;
  loadingGetTransferFrom: boolean;
  loadingGetTransferTo: boolean;
  loadingGetActiveTransfer: boolean;
  loadingGetTrashedTransfer: boolean;

  loadingCreateTransfer: boolean;
  loadingUpdateTransfer: boolean;
  loadingTrashedTransfer: boolean;

  errorGetTransfers: string | null;
  errorGetTransfer: string | null;
  errorGetTransferFrom: string | null;
  errorGetTransferTo: string | null;
  errorGetActiveTransfer: string | null;
  errorGetTrashedTransfer: string | null;

  errorCreateTransfer: string | null;
  errorUpdateTransfer: string | null;
  errorTrashedTransfer: string | null;

  setLoadingGetTransfers: (value: boolean) => void;
  setLoadingGetTransfer: (value: boolean) => void;
  setLoadingGetTransferFrom: (value: boolean) => void;
  setLoadingGetTransferTo: (value: boolean) => void;
  setLoadingGetActiveTransfer: (value: boolean) => void;
  setLoadingGetTrashedTransfer: (value: boolean) => void;

  setLoadingCreateTransfer: (value: boolean) => void;
  setLoadingUpdateTransfer: (value: boolean) => void;
  setLoadingTrashedTransfer: (value: boolean) => void;

  setErrorGetTransfers: (value: string | null) => void;
  setErrorGetTransfer: (value: string | null) => void;
  setErrorGetTransferFrom: (value: string | null) => void;
  setErrorGetTransferTo: (value: string | null) => void;
  setErrorGetActiveTransfer: (value: string | null) => void;
  setErrorGetTrashedTransfer: (value: string | null) => void;

  setErrorCreateTransfer: (value: string | null) => void;
  setErrorUpdateTransfer: (value: string | null) => void;
  setErrorTrashedTransfer: (value: string | null) => void;

  findAllTransfers: (req: FindAllTransfer) => Promise<void>;
  findByIdTransfer: (req: FindByIdTransfer) => Promise<void>;
  findByTransferFrom: (req: TransferFrom) => Promise<void>;
  findByTransferTo: (req: TransferTo) => Promise<void>;
  findByActiveTransfer: (
    search: string,
    page: number,
    pageSize: number,
  ) => Promise<void>;
  createTransfer: (req: CreateTransfer) => Promise<boolean>;
  updateTransfer: (req: UpdateTransfer) => Promise<boolean>;
  trashedTransfer: (req: TrashedTransfer) => Promise<boolean>;
}
