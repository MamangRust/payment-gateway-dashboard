import { WithdrawStore } from "@/types/state/withdraw/withdraw";
import { create } from "zustand";
import { getAccessToken } from "../auth";
import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { FindAllWithdraw } from "@/types/domain/request/withdraw/list";
import {
  CreateWithdraw,
  FindByCardNumberWithdraw,
  FindByIdWithdraw,
  TrashedWithdraw,
  UpdateWithdraw,
} from "@/types/domain/request";
import { handleMessageAction } from "@/helpers/message";

const useWithdrawStore = create<WithdrawStore>((set, get) => ({
  withdraws: null,
  withdraw: null,

  monthStatusSuccess: null,
  yearStatusSuccess: null,

  monthStatusFailed: null,
  yearStatusFailed: null,

  monthWithdrawAmount: null,
  yearWithdrawAmount: null,

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
  loadingMonthWithdrawAmount: false,
  loadingYearWithdrawAmount: false,

  loadingGetWithdraws: false,
  loadingGetWithdraw: false,
  loadingGetCardNumberWithdraw: false,
  loadingGetActiveWithdraw: false,
  loadingGetTrashedWithdraw: false,

  loadingCreateWithdraw: false,
  loadingUpdateWithdraw: false,
  loadingTrashedWithdraw: false,
  loadingRestoreWithdraw: false,
  loadingPermanentWithdraw: false,

  errorMonthStatusSuccess: null,
  errorYearStatusSuccess: null,
  errorMonthStatusFailed: null,
  errorYearStatusFailed: null,
  errorMonthWithdrawAmount: null,
  errorYearWithdrawAmount: null,

  errorGetWithdraws: null,
  errorGetWithdraw: null,
  errorGetCardNumberWithdraw: null,
  errorGetActiveWithdraw: null,
  errorGetTrashedWithdraw: null,

  errorCreateWithdraw: null,
  errorUpdateWithdraw: null,
  errorTrashedWithdraw: null,
  errorRestoreWithdraw: null,
  errorPermanentWithdraw: null,

  setLoadingMonthStatusSuccess: (value) =>
    set({ loadingMonthStatusSuccess: value }),
  setLoadingYearStatusSuccess: (value) =>
    set({ loadingYearStatusSuccess: value }),
  setLoadingMonthStatusFailed: (value) =>
    set({ loadingMonthStatusFailed: value }),
  setLoadingYearStatusFailed: (value) =>
    set({ loadingYearStatusFailed: value }),
  setLoadingMonthWithdrawAmount: (value) =>
    set({ loadingMonthWithdrawAmount: value }),
  setLoadingYearWithdrawAmount: (value) =>
    set({ loadingYearWithdrawAmount: value }),

  setLoadingGetWithdraws: (value) => set({ loadingGetWithdraws: value }),
  setLoadingGetWithdraw: (value) => set({ loadingGetWithdraw: value }),
  setLoadingGetCardNumberWithdraw: (value) =>
    set({ loadingGetCardNumberWithdraw: value }),
  setLoadingGetActiveWithdraw: (value) =>
    set({ loadingGetActiveWithdraw: value }),
  setLoadingGetTrashedWithdraw: (value) =>
    set({ loadingGetTrashedWithdraw: value }),

  setLoadingCreateWithdraw: (value) => set({ loadingCreateWithdraw: value }),
  setLoadingUpdateWithdraw: (value) => set({ loadingUpdateWithdraw: value }),
  setLoadingTrashedWithdraw: (value) => set({ loadingTrashedWithdraw: value }),

  setErrorMonthStatusSuccess: (value) =>
    set({ errorMonthStatusSuccess: value }),
  setErrorYearStatusSuccess: (value) => set({ errorYearStatusSuccess: value }),
  setErrorMonthStatusFailed: (value) => set({ errorMonthStatusFailed: value }),
  setErrorYearStatusFailed: (value) => set({ errorYearStatusFailed: value }),
  setErrorMonthWithdrawAmount: (value) =>
    set({ errorMonthWithdrawAmount: value }),
  setErrorYearWithdrawAmount: (value) =>
    set({ errorYearWithdrawAmount: value }),

  setErrorGetWithdraws: (value) => set({ errorGetWithdraws: value }),
  setErrorGetWithdraw: (value) => set({ errorGetWithdraw: value }),
  setErrorGetCardNumberWithdraw: (value) =>
    set({ errorGetCardNumberWithdraw: value }),
  setErrorGetActiveWithdraw: (value) => set({ errorGetActiveWithdraw: value }),
  setErrorGetTrashedWithdraw: (value) =>
    set({ errorGetTrashedWithdraw: value }),

  setErrorCreateWithdraw: (value) => set({ errorCreateWithdraw: value }),
  setErrorUpdateWithdraw: (value) => set({ errorUpdateWithdraw: value }),
  setErrorTrashedWithdraw: (value) => set({ errorTrashedWithdraw: value }),

  findMonthStatusSuccess: async (toast: any, year: number, month: number) => {
    set({ loadingMonthStatusSuccess: true, errorMonthStatusSuccess: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/withdraws/month-success", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });
      set({
        monthStatusSuccess: response.data.data,
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

  findYearStatusSuccess: async (toast: any, year: number) => {
    set({ loadingYearStatusSuccess: true, errorYearStatusSuccess: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/withdraws/year-success", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
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

  findMonthStatusFailed: async (toast: any, year: number, month: number) => {
    set({ loadingMonthStatusFailed: true, errorMonthStatusFailed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/withdraws/month-failed", {
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

  findYearStatusFailed: async (toast: any, year: number) => {
    set({ loadingYearStatusFailed: true, errorYearStatusFailed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/withdraws/year-failed", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
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

  findMonthWithdrawAmount: async (toast: any, year: number) => {
    set({ loadingMonthWithdrawAmount: true, errorMonthWithdrawAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/withdraws/monthly-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      set({
        monthWithdrawAmount: response.data.data,
        loadingMonthWithdrawAmount: false,
        errorMonthWithdrawAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthWithdrawAmount: false }),
        (message: any) => set({ errorMonthWithdrawAmount: message }),
        toast,
      );
    }
  },

  findYearWithdrawAmount: async (toast: any, year: number) => {
    set({ loadingYearWithdrawAmount: true, errorYearWithdrawAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/withdraws/yearly-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      set({
        yearWithdrawAmount: response.data.data,
        loadingYearWithdrawAmount: false,
        errorYearWithdrawAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearWithdrawAmount: false }),
        (message: any) => set({ errorYearWithdrawAmount: message }),
        toast,
      );
    }
  },

  findMonthWithdrawAmountByCard: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({ loadingMonthWithdrawAmount: true, errorMonthWithdrawAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/withdraws/monthly-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });
      set({
        monthWithdrawAmount: response.data.data,
        loadingMonthWithdrawAmount: false,
        errorMonthWithdrawAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthWithdrawAmount: false }),
        (message: any) => set({ errorMonthWithdrawAmount: message }),
        toast,
      );
    }
  },

  findYearWithdrawAmountByCard: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({ loadingYearWithdrawAmount: true, errorYearWithdrawAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/withdraws/yearly-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });
      set({
        yearWithdrawAmount: response.data.data,
        loadingYearWithdrawAmount: false,
        errorYearWithdrawAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearWithdrawAmount: false }),
        (message: any) => set({ errorYearWithdrawAmount: message }),
        toast,
      );
    }
  },

  findAllWithdraws: async (req: FindAllWithdraw) => {
    set({ loadingGetWithdraws: true, errorGetWithdraws: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/withdraws", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        withdraws: response.data.data,
        pagination: {
          currentPage: response.data.pagination.current_page,
          pageSize: response.data.pagination.page_size,
          totalItems: response.data.pagination.total_records,
          totalPages: response.data.pagination.total_pages,
        },
        loadingGetWithdraws: false,
        errorGetWithdraws: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetWithdraws: false }),
        (message: any) => set({ errorGetWithdraws: message }),
        req.toast,
      );
    }
  },

  findByIdWithdraw: async (req: FindByIdWithdraw) => {
    set({ loadingGetWithdraw: true, errorGetWithdraw: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/withdraws/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({
        withdraw: response.data.data,
        loadingGetWithdraw: false,
        errorGetWithdraw: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetWithdraw: false }),
        (message: any) => set({ errorGetWithdraw: message }),
        req.toast,
      );
    }
  },

  findByCardNumberWithdraw: async (req: FindByCardNumberWithdraw) => {
    set({
      loadingGetCardNumberWithdraw: true,
      errorGetCardNumberWithdraw: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        `/withdraws/card-number/${req.cardNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      set({
        withdraw: response.data,
        loadingGetCardNumberWithdraw: false,
        errorGetCardNumberWithdraw: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetCardNumberWithdraw: false }),
        (message: any) => set({ errorGetCardNumberWithdraw: message }),
        req.toast,
      );
    }
  },

  findByActiveWithdraw: async (
    search: string,
    page: number,
    pageSize: number,
  ) => {
    set({ loadingGetActiveWithdraw: true, errorGetActiveWithdraw: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/withdraws/active", {
        params: { search, page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        withdraws: response.data.items,
        pagination: {
          currentPage: response.data.currentPage,
          pageSize: response.data.pageSize,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
        },
        loadingGetActiveWithdraw: false,
        errorGetActiveWithdraw: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetActiveWithdraw: false }),
        (message: any) => set({ errorGetActiveWithdraw: message }),
        null,
      );
    }
  },

  createWithdraw: async (req: CreateWithdraw) => {
    set({ loadingCreateWithdraw: true, errorCreateWithdraw: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(
        "/withdraws/create",
        {
          card_number: req.card_number,
          withdraw_amount: req.withdraw_amount,
          withdraw_time: req.withdraw_time,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleMessageAction("withdraw", "create");

      set({ loadingCreateWithdraw: false, errorCreateWithdraw: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingCreateWithdraw: false }),
        (message: any) => set({ errorCreateWithdraw: message }),
        req.toast,
      );
    }
  },

  updateWithdraw: async (req: UpdateWithdraw) => {
    set({ loadingUpdateWithdraw: true, errorUpdateWithdraw: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(
        `/withdraws/update/${req.id}`,
        {
          withdraw_id: req.id,
          card_number: req.card_number,
          withdraw_amount: req.withdraw_amount,
          withdraw_time: req.withdraw_time,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleMessageAction("withdraw", "update");

      set({ loadingUpdateWithdraw: false, errorUpdateWithdraw: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingUpdateWithdraw: false }),
        (message: any) => set({ errorUpdateWithdraw: message }),
        req.toast,
      );
    }
  },

  trashedWithdraw: async (req: TrashedWithdraw) => {
    set({ loadingTrashedWithdraw: true, errorTrashedWithdraw: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(`/withdraws/trashed/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      handleMessageAction("withdraw", "restore");
      set({ loadingTrashedWithdraw: false, errorTrashedWithdraw: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingTrashedWithdraw: false }),
        (message: any) => set({ errorTrashedWithdraw: message }),
        req.id,
      );
    }
  },
}));

export default useWithdrawStore;
