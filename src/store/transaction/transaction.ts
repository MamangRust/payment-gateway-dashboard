import { TransactionStore } from "@/types/state/transaction/transaction";
import { create } from "zustand";
import { getAccessToken } from "../auth";
import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import {
  CreateTransaction,
  FindAllTransaction,
  FindyByCardNumberTransaction,
  FindyByIdTransaction,
  FindyByMerchantTransaction,
  TrashedTransaction,
  UpdateTransaction,
} from "@/types/domain/request";

const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: null,
  transaction: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingGetTransactions: false,
  loadingGetTransaction: false,
  loadingGetCardNumberTransaction: false,
  loadingGetMerchantTransaction: false,
  loadingGetActiveTransaction: false,
  loadingGetTrashedTransaction: false,

  loadingCreateTransaction: false,
  loadingUpdateTransaction: false,
  loadingRestoreTransaction: false,
  loadingTrashedTransaction: false,
  loadingDeletePermanentTransaction: false,

  errorGetTransactions: null,
  errorGetTransaction: null,
  errorGetCardNumberTransaction: null,
  errorGetMerchantTransaction: null,
  errorGetActiveTransaction: null,
  errorGetTrashedTransaction: null,

  errorCreateTransaction: null,
  errorUpdateTransaction: null,
  errorRestoreTransaction: null,
  errorTrashedTransaction: null,
  errorDeletePermanentTransaction: null,

  setLoadingGetTransactions: (value) => set({ loadingGetTransactions: value }),
  setLoadingGetTransaction: (value) => set({ loadingGetTransaction: value }),
  setLoadingGetCardNumberTransaction: (value) =>
    set({ loadingGetCardNumberTransaction: value }),
  setLoadingGetMerchantTransaction: (value) =>
    set({ loadingGetMerchantTransaction: value }),
  setLoadingGetActiveTransaction: (value) =>
    set({ loadingGetActiveTransaction: value }),
  setLoadingGetTrashedTransaction: (value) =>
    set({ loadingGetTrashedTransaction: value }),

  setLoadingCreateTransaction: (value) =>
    set({ loadingCreateTransaction: value }),
  setLoadingUpdateTransaction: (value) =>
    set({ loadingUpdateTransaction: value }),
  setLoadingTrashedTransaction: (value) =>
    set({ loadingTrashedTransaction: value }),

  setErrorGetTransactions: (value) => set({ errorGetTransactions: value }),
  setErrorGetTransaction: (value) => set({ errorGetTransaction: value }),
  setErrorGetCardNumberTransaction: (value) =>
    set({ errorGetCardNumberTransaction: value }),
  setErrorGetMerchantTransaction: (value) =>
    set({ errorGetMerchantTransaction: value }),
  setErrorGetActiveTransaction: (value) =>
    set({ errorGetActiveTransaction: value }),
  setErrorGetTrashedTransaction: (value) =>
    set({ errorGetTrashedTransaction: value }),

  setErrorCreateTransaction: (value) => set({ errorCreateTransaction: value }),
  setErrorUpdateTransaction: (value) => set({ errorUpdateTransaction: value }),
  setErrorTrashedTransaction: (value) =>
    set({ errorTrashedTransaction: value }),

  findAllTransactions: async (req: FindAllTransaction) => {
    set({ loadingGetTransactions: true, errorGetTransactions: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("response:", response.data.data);
      set({
        transactions: response.data.data,
        pagination: {
          currentPage: response.data.pagination.current_page,
          pageSize: response.data.pagination.page_size,
          totalItems: response.data.pagination.total_records,
          totalPages: response.data.pagination.total_pages,
        },
        loadingGetTransactions: false,
        errorGetTransactions: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTransactions: false }),
        (message: any) => set({ errorGetTransactions: message }),
        req.toast,
      );
    }
  },

  findByIdTransaction: async (req: FindyByIdTransaction) => {
    set({ loadingGetTransaction: true, errorGetTransaction: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/transactions/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transaction: response.data,
        loadingGetTransaction: false,
        errorGetTransaction: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTransaction: false }),
        (message: any) => set({ errorGetTransaction: message }),
        req.toast,
      );
    }
  },

  findByCardNumberTransaction: async (req: FindyByCardNumberTransaction) => {
    set({
      loadingGetCardNumberTransaction: true,
      errorGetCardNumberTransaction: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        `/transactions/card-number/${req.cardNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      set({
        transaction: response.data,
        loadingGetCardNumberTransaction: false,
        errorGetCardNumberTransaction: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetCardNumberTransaction: false }),
        (message: any) => set({ errorGetCardNumberTransaction: message }),
        req.cardNumber,
      );
    }
  },

  findByMerchantTransaction: async (req: FindyByMerchantTransaction) => {
    set({
      loadingGetMerchantTransaction: true,
      errorGetMerchantTransaction: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/transactions/merchant/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transactions: response.data,
        loadingGetMerchantTransaction: false,
        errorGetMerchantTransaction: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetMerchantTransaction: false }),
        (message: any) => set({ errorGetMerchantTransaction: message }),
        req.toast,
      );
    }
  },

  findByActiveTransaction: async (
    search: string,
    page: number,
    pageSize: number,
  ) => {
    set({ loadingGetActiveTransaction: true, errorGetActiveTransaction: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions/active", {
        params: { search, page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transactions: response.data.items,
        pagination: {
          currentPage: response.data.currentPage,
          pageSize: response.data.pageSize,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
        },
        loadingGetActiveTransaction: false,
        errorGetActiveTransaction: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetActiveTransaction: false }),
        (message: any) => set({ errorGetActiveTransaction: message }),
        null,
      );
    }
  },

  createTransaction: async (req: CreateTransaction) => {
    set({ loadingCreateTransaction: true, errorCreateTransaction: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post("/transactions", req, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loadingCreateTransaction: false, errorCreateTransaction: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingCreateTransaction: false }),
        (message: any) => set({ errorCreateTransaction: message }),
        req.toast,
      );
    }
  },

  updateTransaction: async (req: UpdateTransaction) => {
    set({ loadingUpdateTransaction: true, errorUpdateTransaction: null });
    try {
      const token = getAccessToken();
      const response = await myApi.put(`/transactions/${req.id}`, req, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loadingUpdateTransaction: false, errorUpdateTransaction: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingUpdateTransaction: false }),
        (message: any) => set({ errorUpdateTransaction: message }),
        req.toast,
      );
    }
  },

  trashedTransaction: async (req: TrashedTransaction) => {
    set({ loadingTrashedTransaction: true, errorTrashedTransaction: null });
    try {
      const token = getAccessToken();
      const response = await myApi.patch(
        `/transactions/trashed/${req.id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      set({ loadingTrashedTransaction: false, errorTrashedTransaction: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingTrashedTransaction: false }),
        (message: any) => set({ errorTrashedTransaction: message }),
        req.toast,
      );
    }
  },
}));

export default useTransactionStore;
