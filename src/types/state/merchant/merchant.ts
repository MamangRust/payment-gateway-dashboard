import {
  CreateMerchant,
  FindAllMerchant,
  findByApiKeyMerchant,
  FindByIdMerchant,
  FindMerchantUser,
  FindTrashedMerchant,
  UpdateMerchant,
} from "../../domain/request";
import { Merchant } from "../../model/merchant";

export interface MerchantStore {
  merchants: Merchant[] | null;
  merchant: Merchant | null;

  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };

  loadingGetMerchants: boolean;
  loadingGetMerchant: boolean;
  loadingGetApiKey: boolean;
  loadingGetMerchantUser: boolean;
  loadingGetActiveMerchant: boolean;
  loadingGetTrashedMerchant: boolean;

  loadingCreateMerchant: boolean;
  loadingUpdateMerchant: boolean;
  loadingTrashedMerchant: boolean;
  loadingRestoreMerchant: boolean;
  loadingDeletePermanentMerchant: boolean;

  errorGetMerchants: string | null;
  errorGetMerchant: string | null;
  errorGetApiKey: string | null;
  errorGetMerchantUser: string | null;
  errorGetActiveMerchant: string | null;
  errorGetTrashedMerchant: string | null;

  errorCreateMerchant: string | null;
  errorUpdateMerchant: string | null;
  errorTrashedMerchant: string | null;

  setLoadingGetMerchants: (value: boolean) => void;
  setLoadingGetMerchant: (value: boolean) => void;
  setLoadingGetApiKey: (value: boolean) => void;
  setLoadingGetMerchantUser: (value: boolean) => void;
  setLoadingGetActiveMerchant: (value: boolean) => void;
  setLoadingGetTrashedMerchant: (value: boolean) => void;
  setLoadingCreateMerchant: (value: boolean) => void;
  setLoadingUpdateMerchant: (value: boolean) => void;
  setLoadingTrashedMerchant: (value: boolean) => void;

  setErrorGetMerchants: (value: string | null) => void;
  setErrorGetMerchant: (value: string | null) => void;
  setErrorGetApiKey: (value: string | null) => void;
  setErrorGetMerchantUser: (value: string | null) => void;
  setErrorGetActiveMerchant: (value: string | null) => void;
  setErrorGetTrashedMerchant: (value: string | null) => void;
  setErrorCreateMerchant: (value: string | null) => void;
  setErrorUpdateMerchant: (value: string | null) => void;
  setErrorTrashedMerchant: (value: string | null) => void;

  findAllMerchants: (req: FindAllMerchant) => Promise<void>;
  findById: (req: FindByIdMerchant) => Promise<void>;
  findByApiKey: (req: findByApiKeyMerchant) => Promise<void>;
  findByMerchantUser: (req: FindMerchantUser) => Promise<void>;

  createMerchant: (req: CreateMerchant) => Promise<boolean>;
  updateMerchant: (req: UpdateMerchant) => Promise<boolean>;
  trashedMerchant: (req: FindTrashedMerchant) => Promise<boolean>;
}
