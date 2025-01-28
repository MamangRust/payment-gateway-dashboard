import { create } from "zustand";
import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { MerchantStore } from "@/types/state/merchant/merchant";
import {
  CreateMerchant,
  FindAllMerchant,
  FindAllMerchantTransaction,
  findByApiKeyMerchant,
  FindByIdMerchant,
  FindMerchantUser,
  FindTrashedMerchant,
  UpdateMerchant,
} from "@/types/domain/request";
import { getAccessToken } from "../auth";
import { handleMessageAction } from "@/helpers/message";

const useMerchantStore = create<MerchantStore>((set, get) => ({
  merchants: null,
  merchant: null,

  transactions: null,

  monthPaymentMethod: null,
  yearPaymentMethod: null,

  monthAmount: null,
  yearAmount: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  paginationTransaction: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingMonthPaymentMethod: false,
  loadingYearPaymentMethod: false,
  loadingMonthAmount: false,
  loadingYearAmount: false,

  loadingGetMerchants: false,
  loadingGetTransactions: false,
  loadingGetMerchant: false,
  loadingGetApiKey: false,
  loadingGetMerchantUser: false,
  loadingGetActiveMerchant: false,
  loadingGetTrashedMerchant: false,
  loadingCreateMerchant: false,
  loadingUpdateMerchant: false,
  loadingTrashedMerchant: false,
  loadingRestoreMerchant: false,
  loadingDeletePermanentMerchant: false,

  errorMonthPaymentMethod: null,
  errorYearPaymentMethod: null,
  errorMonthAmount: null,
  errorYearAmount: null,

  errorGetMerchants: null,
  errorGetTransactions: null,
  errorGetMerchant: null,
  errorGetApiKey: null,
  errorGetMerchantUser: null,
  errorGetActiveMerchant: null,
  errorGetTrashedMerchant: null,
  errorCreateMerchant: null,
  errorUpdateMerchant: null,
  errorTrashedMerchant: null,

  setLoadingMonthPaymentMethod: (value: boolean) =>
    set({ loadingMonthPaymentMethod: value }),
  setLoadingYearPaymentMethod: (value: boolean) =>
    set({ loadingYearPaymentMethod: value }),
  setLoadingMonthAmount: (value: boolean) => set({ loadingMonthAmount: value }),
  setLoadingYearAmount: (value: boolean) => set({ loadingYearAmount: value }),

  setLoadingGetMerchants: (value) => set({ loadingGetMerchants: value }),
  setLoadingGetTransactions: (value) => set({ loadingGetTransactions: value }),
  setLoadingGetMerchant: (value) => set({ loadingGetMerchant: value }),
  setLoadingGetApiKey: (value) => set({ loadingGetApiKey: value }),
  setLoadingGetMerchantUser: (value) => set({ loadingGetMerchantUser: value }),
  setLoadingGetActiveMerchant: (value) =>
    set({ loadingGetActiveMerchant: value }),
  setLoadingGetTrashedMerchant: (value) =>
    set({ loadingGetTrashedMerchant: value }),
  setLoadingCreateMerchant: (value) => set({ loadingCreateMerchant: value }),
  setLoadingUpdateMerchant: (value) => set({ loadingUpdateMerchant: value }),
  setLoadingTrashedMerchant: (value) => set({ loadingTrashedMerchant: value }),

  setErrorMonthPaymentMethod: (value) =>
    set({ errorMonthPaymentMethod: value }),
  setErrorYearPaymentMethod: (value) => set({ errorYearPaymentMethod: value }),
  setErrorMonthAmount: (value) => set({ errorMonthAmount: value }),
  setErrorYearAmount: (value) => set({ errorYearAmount: value }),

  setErrorGetMerchants: (value) => set({ errorGetMerchants: value }),
  setErrorGetTransactions: (value) => set({ errorGetTransactions: value }),
  setErrorGetMerchant: (value) => set({ errorGetMerchant: value }),
  setErrorGetApiKey: (value) => set({ errorGetApiKey: value }),
  setErrorGetMerchantUser: (value) => set({ errorGetMerchantUser: value }),
  setErrorGetActiveMerchant: (value) => set({ errorGetActiveMerchant: value }),
  setErrorGetTrashedMerchant: (value) =>
    set({ errorGetTrashedMerchant: value }),
  setErrorCreateMerchant: (value) => set({ errorCreateMerchant: value }),
  setErrorUpdateMerchant: (value) => set({ errorUpdateMerchant: value }),
  setErrorTrashedMerchant: (value) => set({ errorTrashedMerchant: value }),

  findMonthPaymentMethod: async (toast: any, year: number) => {
    set({ loadingMonthPaymentMethod: true, errorMonthPaymentMethod: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/merchants/monthly-payment-methods", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      console.log("response", response.data.data);

      set({
        monthPaymentMethod: response.data.data,
        loadingMonthPaymentMethod: false,
        errorMonthPaymentMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthPaymentMethod: false }),
        (message: any) => set({ errorMonthPaymentMethod: message }),
        toast,
      );
    }
  },

  findYearPaymentMethod: async (toast: any, year: number) => {
    set({ loadingYearPaymentMethod: true, errorYearPaymentMethod: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/merchants/yearly-payment-methods", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });

      set({
        yearPaymentMethod: response.data.data,
        loadingYearPaymentMethod: false,
        errorYearPaymentMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearPaymentMethod: false }),
        (message: any) => set({ errorYearPaymentMethod: message }),
        toast,
      );
    }
  },

  findMonthAmount: async (toast: any, year: number) => {
    set({ loadingMonthAmount: true, errorMonthAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/merchants/monthly-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      console.log("month amount:", response);

      set({
        monthAmount: response.data.data,
        loadingMonthAmount: false,
        errorMonthAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthAmount: false }),
        (message: any) => set({ errorMonthAmount: message }),
        toast,
      );
    }
  },

  findYearAmount: async (toast: any, year: number) => {
    set({ loadingYearAmount: true, errorYearAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/merchants/yearly-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });

      console.log("year amount:", response);
      set({
        yearAmount: response.data.data,
        loadingYearAmount: false,
        errorYearAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearAmount: false }),
        (message: any) => set({ errorYearAmount: message }),
        toast,
      );
    }
  },

  findMonthPaymentMethodByMerchant: async (
    toast: any,
    year: number,
    merchant_id: number,
  ) => {
    set({ loadingMonthPaymentMethod: true, errorMonthPaymentMethod: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/merchants/monthly-payment-methods-by-merchant",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            year,
            merchant_id,
          },
        },
      );
      set({
        monthPaymentMethod: response.data.data,
        loadingMonthPaymentMethod: false,
        errorMonthPaymentMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthPaymentMethod: false }),
        (message: any) => set({ errorMonthPaymentMethod: message }),
        toast,
      );
    }
  },

  findYearPaymentMethodByMerchant: async (
    toast: any,
    year: number,
    merchant_id: number,
  ) => {
    set({ loadingYearPaymentMethod: true, errorYearPaymentMethod: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/merchants/yearly-payment-methods-by-merchant",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            year,
            merchant_id,
          },
        },
      );
      set({
        yearPaymentMethod: response.data.data,
        loadingYearPaymentMethod: false,
        errorYearPaymentMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearPaymentMethod: false }),
        (message: any) => set({ errorYearPaymentMethod: message }),
        toast,
      );
    }
  },

  findMonthAmountByMerchant: async (
    toast: any,
    year: number,
    merchant_id: number,
  ) => {
    set({ loadingMonthAmount: true, errorMonthAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/merchants/monthly-amount-by-merchant",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            year,
            merchant_id,
          },
        },
      );
      set({
        monthAmount: response.data.data,
        loadingMonthAmount: false,
        errorMonthAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthAmount: false }),
        (message: any) => set({ errorMonthAmount: message }),
        toast,
      );
    }
  },

  findYearAmountByMerchant: async (
    toast: any,
    year: number,
    merchant_id: number,
  ) => {
    set({ loadingYearAmount: true, errorYearAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/merchants/yearly-amount-by-merchant", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          merchant_id,
        },
      });
      set({
        yearAmount: response.data.data,
        loadingYearAmount: false,
        errorYearAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearAmount: false }),
        (message: any) => set({ errorYearAmount: message }),
        toast,
      );
    }
  },

  findAllMerchants: async (req: FindAllMerchant) => {
    set({ loadingGetMerchants: true, errorGetMerchants: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/merchants", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: { Authorization: `Bearer ${token}` },
      });

      set({
        merchants: response.data.data,
        pagination: {
          currentPage: response.data.pagination.current_page,
          pageSize: response.data.pagination.page_size,
          totalItems: response.data.pagination.total_records,
          totalPages: response.data.pagination.total_pages,
        },
        loadingGetMerchants: false,
        errorGetMerchants: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetMerchants: false }),
        (message: any) => set({ errorGetMerchants: message }),
        req.toast,
      );
    }
  },

  findAllTransaction: async (req: FindAllMerchant) => {
    set({ loadingGetTransactions: true, errorGetTransactions: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/merchants/transactions", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: { Authorization: `Bearer ${token}` },
      });

      set({
        transactions: response.data.data,
        paginationTransaction: {
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

  findAllTransactionByMerchant: async (req: FindAllMerchantTransaction) => {
    set({ loadingGetTransactions: true, errorGetTransactions: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/merchants/transactions", {
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

  findById: async (req: FindByIdMerchant) => {
    set({ loadingGetMerchant: true, errorGetMerchant: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/merchants/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("response", response.data.data);
      set({
        merchant: response.data.data,
        loadingGetMerchant: false,
        errorGetMerchant: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetMerchant: false }),
        (message: any) => set({ errorGetMerchant: message }),
        req.toast,
      );
    }
  },

  findByApiKey: async (req: findByApiKeyMerchant) => {
    set({ loadingGetApiKey: true, errorGetApiKey: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/merchants/api-key/${req.api_key}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        merchant: response.data,
        loadingGetApiKey: false,
        errorGetApiKey: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetApiKey: false }),
        (message: any) => set({ errorGetApiKey: message }),
        req.toast,
      );
    }
  },

  findByMerchantUser: async (req: FindMerchantUser) => {
    set({ loadingGetMerchantUser: true, errorGetMerchantUser: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        `/merchants/merchant-user/${req.user_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      set({
        merchants: response.data,
        loadingGetMerchantUser: false,
        errorGetMerchantUser: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetMerchantUser: false }),
        (message: any) => set({ errorGetMerchantUser: message }),
        req.toast,
      );
    }
  },

  findByActive: async (search: string, page: number, pageSize: number) => {
    set({ loadingGetActiveMerchant: true, errorGetActiveMerchant: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/merchants/active", {
        params: { search, page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        merchants: response.data.items,
        pagination: {
          currentPage: response.data.currentPage,
          pageSize: response.data.pageSize,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
        },
        loadingGetActiveMerchant: false,
        errorGetActiveMerchant: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetActiveMerchant: false }),
        (message: any) => set({ errorGetActiveMerchant: null }),
        null,
      );
    }
  },

  createMerchant: async (req: CreateMerchant) => {
    set({ loadingCreateMerchant: true, errorCreateMerchant: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(
        "/merchants/create",
        {
          name: req.name,
          user_id: req.user_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleMessageAction("merchant", "create");

      set({ loadingCreateMerchant: false, errorCreateMerchant: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingCreateMerchant: false }),
        (message: any) => set({ errorCreateMerchant: message }),
        req.toast,
      );
    }
  },

  updateMerchant: async (req: UpdateMerchant) => {
    set({ loadingUpdateMerchant: true, errorUpdateMerchant: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(
        `/merchants/updates/${req.merchant_id}`,
        {
          merchant_id: req.merchant_id,
          name: req.name,
          user_id: req.user_id,
          status: req.status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("response req merchant", req);

      console.log("response merchant", response.data.data);

      handleMessageAction("merchant", "update");

      set({ loadingUpdateMerchant: false, errorUpdateMerchant: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingUpdateMerchant: false }),
        (message: any) => set({ errorUpdateMerchant: message }),
        req.toast,
      );
    }
  },
  trashedMerchant: async (req: FindTrashedMerchant) => {
    set({ loadingTrashedMerchant: true, errorTrashedMerchant: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(`/merchants/trashed/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleMessageAction("merchant", "trashed");

      set({ loadingTrashedMerchant: false, errorTrashedMerchant: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingTrashedMerchant: false }),
        (message: any) => set({ errorTrashedMerchant: message }),
        req.toast,
      );
    }
  },
}));

export default useMerchantStore;
