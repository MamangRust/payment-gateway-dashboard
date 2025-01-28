import { SaldoStore } from "@/types/state/saldo";
import { create } from "zustand";
import { getAccessToken } from "../auth";
import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import {
  CreateSaldo,
  UpdateSaldo,
  FindByIdSaldo,
  TrashedSaldo,
} from "@/types/domain/request";
import {
  FindAllSaldo,
  FindByCardNumberSaldo,
} from "@/types/domain/request/saldo";
import { handleMessageAction } from "@/helpers/message";

const useSaldoStore = create<SaldoStore>((set, get) => ({
  saldos: null,
  saldo: null,

  monthTotalBalance: null,
  yearTotalBalance: null,

  monthBalance: null,
  yearBalance: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingMonthTotalBalance: false,
  loadingYearTotalBalance: false,
  loadingMonthBalance: false,
  loadingYearBalance: false,

  loadingGetSaldos: false,
  loadingGetSaldo: false,
  loadingGetActiveSaldo: false,
  loadingGetTrashedSaldo: false,
  loadingGetCardNumberSaldo: false,

  loadingCreateSaldo: false,
  loadingUpdateSaldo: false,
  loadingTrashedSaldo: false,
  loadingRestoreSaldo: false,
  loadingDeletePermanent: false,

  errorMonthTotalBalance: null,
  errorYearTotalBalance: null,
  errorMonthBalance: null,
  errorYearBalance: null,

  errorGetSaldos: null,
  errorGetSaldo: null,
  errorGetActiveSaldo: null,
  errorGetTrashedSaldo: null,
  errorGetCardNumberSaldo: null,

  errorCreateSaldo: null,
  errorUpdateSaldo: null,
  errorTrashedSaldo: null,
  errorRestoreSaldo: null,
  errorDeletePermanent: null,

  setLoadingMonthTotalBalance: (value) =>
    set({ loadingMonthTotalBalance: value }),
  setLoadingYearTotalBalance: (value) =>
    set({ loadingYearTotalBalance: value }),
  setLoadingMonthBalance: (value) => set({ loadingMonthBalance: value }),
  setLoadingYearBalance: (value) => set({ loadingYearBalance: value }),

  setLoadingGetSaldos: (value) => set({ loadingGetSaldos: value }),
  setLoadingGetSaldo: (value) => set({ loadingGetSaldo: value }),
  setLoadingGetActiveSaldo: (value) => set({ loadingGetActiveSaldo: value }),
  setLoadingGetTrashedSaldo: (value) => set({ loadingGetTrashedSaldo: value }),
  setLoadingGetCardNumberSaldo: (value) =>
    set({ loadingGetCardNumberSaldo: value }),

  setLoadingCreateSaldo: (value) => set({ loadingCreateSaldo: value }),
  setLoadingUpdateSaldo: (value) => set({ loadingUpdateSaldo: value }),
  setLoadingTrashedSaldo: (value) => set({ loadingTrashedSaldo: value }),

  setErrorMonthTotalBalance: (value) => set({ errorMonthTotalBalance: value }),
  setErrorYearTotalBalance: (value) => set({ errorYearTotalBalance: value }),
  setErrorMonthBalance: (value) => set({ errorMonthBalance: value }),
  setErrorYearBalance: (value) => set({ errorYearBalance: value }),

  setErrorGetSaldos: (value) => set({ errorGetSaldos: value }),
  setErrorGetSaldo: (value) => set({ errorGetSaldo: value }),
  setErrorGetActiveSaldo: (value) => set({ errorGetActiveSaldo: value }),
  setErrorGetTrashedSaldo: (value) => set({ errorGetTrashedSaldo: value }),
  setErrorGetCardNumberSaldo: (value) =>
    set({ errorGetCardNumberSaldo: value }),

  setErrorCreateSaldo: (value) => set({ errorCreateSaldo: value }),
  setErrorUpdateSaldo: (value) => set({ errorUpdateSaldo: value }),
  setErrorTrashedSaldo: (value) => set({ errorTrashedSaldo: value }),

  findMonthTotalBalance: async (toast: any, year: number, month: number) => {
    set({ loadingMonthTotalBalance: true, errorMonthTotalBalance: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/saldos/monthly-total-balance", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });
      console.log("response month total balance:", response.data.data);

      set({
        monthTotalBalance: response.data.data,
        loadingMonthTotalBalance: false,
        errorMonthTotalBalance: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTotalBalance: false }),
        (message: any) => set({ errorMonthTotalBalance: message }),
        toast,
      );
    }
  },

  findYearTotalBalance: async (toast: any, year: number) => {
    set({ loadingYearTotalBalance: true, errorYearTotalBalance: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/saldos/yearly-total-balance", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });

      console.log("response year total balance:", response.data.data);
      set({
        yearTotalBalance: response.data.data,
        loadingYearTotalBalance: false,
        errorYearTotalBalance: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTotalBalance: false }),
        (message: any) => set({ errorYearTotalBalance: message }),
        toast,
      );
    }
  },

  findMonthBalance: async (toast: any, year: number) => {
    set({ loadingMonthBalance: true, errorMonthBalance: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/saldos/monthly-balances", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });

      console.log("month balance: ", response.data);

      set({
        monthBalance: response.data.data,
        loadingMonthBalance: false,
        errorMonthBalance: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthBalance: false }),
        (message: any) => set({ errorMonthBalance: message }),
        toast,
      );
    }
  },

  findYearBalance: async (toast: any, year: number) => {
    set({ loadingYearBalance: true, errorYearBalance: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/saldos/yearly-balances", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      console.log("year balance: ", response.data);

      set({
        yearBalance: response.data.data,
        loadingYearBalance: false,
        errorYearBalance: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearBalance: false }),
        (message: any) => set({ errorYearBalance: message }),
        toast,
      );
    }
  },

  findAllSaldos: async (req: FindAllSaldo) => {
    set({ loadingGetSaldos: true, errorGetSaldos: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/saldos", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        saldos: response.data.data,
        pagination: {
          currentPage: response.data.pagination.current_page,
          pageSize: response.data.pagination.page_size,
          totalItems: response.data.pagination.total_records,
          totalPages: response.data.pagination.total_pages,
        },
        loadingGetSaldos: false,
        errorGetSaldos: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetSaldos: false }),
        (message: any) => set({ errorGetSaldos: message }),
        req.toast,
      );
    }
  },

  findByIdSaldo: async (req: FindByIdSaldo) => {
    set({ loadingGetSaldo: true, errorGetSaldo: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/saldos/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response saldo", response.data.data);

      set({
        saldo: response.data.data,
        loadingGetSaldo: false,
        errorGetSaldo: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetSaldo: false }),
        (message: any) => set({ errorGetSaldo: message }),
        req.toast,
      );
    }
  },

  findByActiveSaldo: async (search: string, page: number, pageSize: number) => {
    set({ loadingGetActiveSaldo: true, errorGetActiveSaldo: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/saldos/active", {
        params: { search, page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        saldos: response.data.items,
        pagination: {
          currentPage: response.data.currentPage,
          pageSize: response.data.pageSize,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
        },
        loadingGetActiveSaldo: false,
        errorGetActiveSaldo: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetActiveSaldo: false }),
        (message: any) => set({ errorGetActiveSaldo: message }),
        null,
      );
    }
  },

  findByCardNumberSaldo: async (req: FindByCardNumberSaldo) => {
    set({ loadingGetCardNumberSaldo: true, errorGetCardNumberSaldo: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        `/saldos/card-number/${req.cardNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      set({
        saldo: response.data,
        loadingGetCardNumberSaldo: false,
        errorGetCardNumberSaldo: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetCardNumberSaldo: false }),
        (message: any) => set({ errorGetCardNumberSaldo: message }),
        req.toast,
      );
    }
  },

  createSaldo: async (req: CreateSaldo) => {
    set({ loadingCreateSaldo: true, errorCreateSaldo: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(
        "/saldos/create",
        {
          card_number: req.card_number,
          total_balance: req.total_balance,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleMessageAction("saldo", "create");

      set({ loadingCreateSaldo: false, errorCreateSaldo: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingCreateSaldo: false }),
        (message: any) => set({ errorCreateSaldo: message }),
        req.toast,
      );
    }
  },

  updateSaldo: async (req: UpdateSaldo) => {
    set({ loadingUpdateSaldo: true, errorUpdateSaldo: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(
        `/saldos/update/${req.id}`,
        {
          card_number: req.card_number,
          total_balance: req.total_balance,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleMessageAction("saldo", "update");

      set({ loadingUpdateSaldo: false, errorUpdateSaldo: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingUpdateSaldo: false }),
        (message: any) => set({ errorUpdateSaldo: message }),
        req.toast,
      );
    }
  },

  trashedSaldo: async (req: TrashedSaldo) => {
    set({ loadingTrashedSaldo: true, errorTrashedSaldo: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(`/saldos/trashed/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleMessageAction("saldo", "trashed");

      set({ loadingTrashedSaldo: false, errorTrashedSaldo: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingTrashedSaldo: false }),
        (message: any) => set({ errorTrashedSaldo: message }),
        req.toast,
      );
    }
  },
}));

export default useSaldoStore;
