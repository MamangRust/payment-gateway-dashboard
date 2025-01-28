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
import { handleMessageAction } from "@/helpers/message";

const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: null,
  transaction: null,

  monthStatusSuccess: null,
  yearStatusSuccess: null,

  monthStatusFailed: null,
  yearStatusFailed: null,

  monthTransactionMethod: null,
  yearTransactionMethod: null,

  monthTransactionAmount: null,
  yearTransactionAmount: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingMonthStatusSuccess: false,
  loadingYearStatusSuccess: false,
  loadingMonthStatusFailed: false,
  loadingYearStatusFailed: false,
  loadingMonthTransactionMethod: false,
  loadingYearTransactionMethod: false,
  loadingMonthTransactionAmount: false,
  loadingYearTransactionAmount: false,

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

  errorMonthStatusSuccess: null,
  errorYearStatusSuccess: null,
  errorMonthStatusFailed: null,
  errorYearStatusFailed: null,
  errorMonthTransactionMethod: null,
  errorYearTransactionMethod: null,
  errorMonthTransactionAmount: null,
  errorYearTransactionAmount: null,

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

  setLoadingMonthStatusSuccess: (value) =>
    set({ loadingMonthStatusSuccess: value }),
  setLoadingYearStatusSuccess: (value) =>
    set({ loadingYearStatusSuccess: value }),
  setLoadingMonthStatusFailed: (value) =>
    set({ loadingMonthStatusFailed: value }),
  setLoadingYearStatusFailed: (value) =>
    set({ loadingYearStatusFailed: value }),

  setLoadingMonthTransactionMethod: (value) =>
    set({ loadingMonthTransactionMethod: value }),
  setLoadingYearTransactionMethod: (value) =>
    set({ loadingYearTransactionMethod: value }),
  setLoadingMonthTransactionAmount: (value) =>
    set({ loadingMonthTransactionAmount: value }),
  setLoadingYearTransactionAmount: (value) =>
    set({ loadingYearTransactionAmount: value }),

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

  setErrorMonthStatusSuccess: (value) =>
    set({ errorMonthStatusSuccess: value }),
  setErrorYearStatusSuccess: (value) => set({ errorYearStatusSuccess: value }),
  setErrorMonthStatusFailed: (value) => set({ errorMonthStatusFailed: value }),
  setErrorYearStatusFailed: (value) => set({ errorYearStatusFailed: value }),

  setErrorMonthTransactionMethod: (value) =>
    set({ errorMonthTransactionMethod: value }),
  setErrorYearTransactionMethod: (value) =>
    set({ errorYearTransactionMethod: value }),
  setErrorMonthTransactionAmount: (value) =>
    set({ errorMonthTransactionAmount: value }),
  setErrorYearTransactionAmount: (value) =>
    set({ errorYearTransactionAmount: value }),

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

  findMonthStatusSuccess: async (toast: any, year: number, month: string) => {
    set({ loadingMonthStatusSuccess: true, errorMonthStatusSuccess: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions/monthly-success", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });
      set({
        monthStatusSuccess: response.data,
        loadingMonthStatusSuccess: false,
        errorMonthStatusSuccess: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthStatusSuccess: false }),
        (message: any) => set({ errorMonthStatusSuccess: message }),
        toast,
      );
    }
  },

  findYearStatusSuccess: async (toast: any, year: number, month: string) => {
    set({ loadingYearStatusSuccess: true, errorYearStatusSuccess: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions/yearly-success", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });
      set({
        yearStatusSuccess: response.data.data,
        loadingYearStatusSuccess: false,
        errorYearStatusSuccess: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearStatusSuccess: false }),
        (message: any) => set({ errorYearStatusSuccess: message }),
        toast,
      );
    }
  },

  findMonthStatusFailed: async (toast: any, year: number, month: string) => {
    set({ loadingMonthStatusFailed: true, errorMonthStatusFailed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions/monthly-failed", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });
      set({
        monthStatusFailed: response.data.data,
        loadingMonthStatusFailed: false,
        errorMonthStatusFailed: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthStatusFailed: false }),
        (message: any) => set({ errorMonthStatusFailed: message }),
        toast,
      );
    }
  },

  findYearStatusFailed: async (toast: any, year: number, month: string) => {
    set({ loadingYearStatusFailed: true, errorYearStatusFailed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions/yearly-failed", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });
      set({
        yearStatusFailed: response.data.data,
        loadingYearStatusFailed: false,
        errorYearStatusFailed: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearStatusFailed: false }),
        (message: any) => set({ errorYearStatusFailed: message }),
        toast,
      );
    }
  },

  findMonthTransactionMethod: async (toast: any, year: number) => {
    set({
      loadingMonthTransactionMethod: true,
      errorMonthTransactionMethod: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions/monthly-methods", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      console.log("month", response.data.data);

      set({
        monthTransactionMethod: response.data.data,
        loadingMonthTransactionMethod: false,
        errorMonthTransactionMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTransactionMethod: false }),
        (message: any) => set({ errorMonthTransactionMethod: message }),
        toast,
      );
    }
  },

  findYearTransactionMethod: async (toast: any, year: number) => {
    set({
      loadingYearTransactionMethod: true,
      errorYearTransactionMethod: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions/yearly-methods", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      set({
        yearTransactionMethod: response.data.data,
        loadingYearTransactionMethod: false,
        errorYearTransactionMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTransactionMethod: false }),
        (message: any) => set({ errorYearTransactionMethod: message }),
        toast,
      );
    }
  },
  findMonthTransactionAmount: async (toast: any, year: number) => {
    set({
      loadingMonthTransactionAmount: true,
      errorMonthTransactionAmount: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions/monthly-amounts", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      set({
        monthTransactionAmount: response.data.data,
        loadingMonthTransactionAmount: false,
        errorMonthTransactionAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTransactionAmount: false }),
        (message: any) => set({ errorMonthTransactionAmount: message }),
        toast,
      );
    }
  },

  findYearTransactionAmount: async (toast: any, year: number) => {
    set({
      loadingYearTransactionAmount: true,
      errorYearTransactionAmount: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions/yearly-amounts", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      set({
        yearTransactionAmount: response.data.data,
        loadingYearTransactionAmount: false,
        errorYearTransactionAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTransactionAmount: false }),
        (message: any) => set({ errorYearTransactionAmount: message }),
        toast,
      );
    }
  },

  findMonthTransactionMethodCard: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({
      loadingMonthTransactionMethod: true,
      errorMonthTransactionMethod: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/transactions/monthly-methods-by-card",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            year,
            card_number,
          },
        },
      );
      set({
        monthTransactionMethod: response.data,
        loadingMonthTransactionMethod: false,
        errorMonthTransactionMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTransactionMethod: false }),
        (message: any) => set({ errorMonthTransactionMethod: message }),
        toast,
      );
    }
  },

  findYearTransactionMethodCard: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({
      loadingYearTransactionMethod: true,
      errorYearTransactionMethod: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions/yearly-methods-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });
      set({
        yearTransactionMethod: response.data,
        loadingYearTransactionMethod: false,
        errorYearTransactionMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTransactionMethod: false }),
        (message: any) => set({ errorYearTransactionMethod: message }),
        toast,
      );
    }
  },
  findMonthTransactionAmountCard: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({
      loadingMonthTransactionAmount: true,
      errorMonthTransactionAmount: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/transactions/monthly-amounts-by-card",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            year,
            card_number,
          },
        },
      );
      set({
        monthTransactionAmount: response.data,
        loadingMonthTransactionAmount: false,
        errorMonthTransactionAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTransactionAmount: false }),
        (message: any) => set({ errorMonthTransactionAmount: message }),
        toast,
      );
    }
  },

  findYearTransactionAmountCard: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({
      loadingYearTransactionAmount: true,
      errorYearTransactionAmount: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions/yearly-amounts-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });
      set({
        yearTransactionAmount: response.data,
        loadingYearTransactionAmount: false,
        errorYearTransactionAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTransactionAmount: false }),
        (message: any) => set({ errorYearTransactionAmount: message }),
        toast,
      );
    }
  },

  findAllTransactions: async (req: FindAllTransaction) => {
    set({ loadingGetTransactions: true, errorGetTransactions: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transactions", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: { Authorization: `Bearer ${token}` },
      });

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
        transaction: response.data.data,
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
      const response = await myApi.post(
        "/transactions/create",
        {
          card_number: req.card_number,
          amount: req.amount,
          merchant_id: req.merchant_id,
          payment_method: req.payment_method,
          transaction_time: req.transaction_time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": req.api_key,
          },
        },
      );
      handleMessageAction("transaction", "create");

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
      const response = await myApi.post(
        `/transactions/update/${req.id}`,
        {
          transaction_id: req.id,
          card_number: req.card_number,
          amount: req.amount,
          merchant_id: req.merchant_id,
          payment_method: req.payment_method,
          transaction_time: req.transaction_time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": req.api_key,
          },
        },
      );
      handleMessageAction("transaction", "update");

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
      const response = await myApi.post(
        `/transactions/trashed/${req.id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleMessageAction("transaction", "trashed");

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
