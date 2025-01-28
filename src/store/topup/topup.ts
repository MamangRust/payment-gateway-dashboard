import { TopupStore } from "@/types/state/topup/topup";
import { create } from "zustand";
import { getAccessToken } from "../auth";
import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import {
  CreateTopup,
  FindAllTopup,
  FindByIdTopup,
  TrashedTopup,
  UpdateTopup,
} from "@/types/domain/request/topup";
import { FindByCardNumberTopup } from "@/types/domain/request/topup/findByCardNumber";
import { handleMessageAction } from "@/helpers/message";

const useTopupStore = create<TopupStore>((set, get) => ({
  topups: null,
  topup: null,

  monthStatusSuccess: null,
  yearStatusSuccess: null,

  monthStatusFailed: null,
  yearStatusFailed: null,

  monthTopupMethod: null,
  yearTopupMethod: null,

  monthTopupAmount: null,
  yearTopupAmount: null,

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
  loadingMonthTopupMethod: false,
  loadingYearTopupMethod: false,
  loadingMonthTopupAmount: false,
  loadingYearTopupAmount: false,

  loadingGetTopups: false,
  loadingGetTopup: false,
  loadingGetActiveTopup: false,
  loadingGetTrashedTopup: false,
  loadingGetCardNumberTopup: false,

  loadingCreateTopup: false,
  loadingUpdateTopup: false,
  loadingTrashedTopup: false,
  loadingRestoreTopup: false,
  loadingPermanentTopup: false,

  errorMonthStatusSuccess: null,
  errorYearStatusSuccess: null,
  errorMonthStatusFailed: null,
  errorYearStatusFailed: null,
  errorMonthTopupMethod: null,
  errorYearTopupMethod: null,
  errorMonthTopupAmount: null,
  errorYearTopupAmount: null,

  errorGetTopups: null,
  errorGetTopup: null,
  errorGetActiveTopup: null,
  errorGetTrashedTopup: null,
  errorGetCardNumberTopup: null,

  errorCreateTopup: null,
  errorUpdateTopup: null,
  errorTrashedTopup: null,
  errorRestoreTopup: null,
  errorPermanentTopup: null,

  setLoadingMonthStatusSuccess: (value) =>
    set({ loadingMonthStatusSuccess: value }),
  setLoadingYearStatusSuccess: (value) =>
    set({ loadingYearStatusSuccess: value }),
  setLoadingMonthStatusFailed: (value) =>
    set({ loadingMonthStatusFailed: value }),
  setLoadingYearStatusFailed: (value) =>
    set({ loadingYearStatusFailed: value }),
  setLoadingMonthTopupMethod: (value) =>
    set({ loadingMonthTopupMethod: value }),
  setLoadingYearTopupMethod: (value) => set({ loadingYearTopupMethod: value }),
  setLoadingMonthTopupAmount: (value) =>
    set({ loadingMonthTopupAmount: value }),
  setLoadingYearTopupAmount: (value) => set({ loadingYearTopupAmount: value }),

  setLoadingGetTopups: (value) => set({ loadingGetTopups: value }),
  setLoadingGetTopup: (value) => set({ loadingGetTopup: value }),
  setLoadingGetActiveTopup: (value) => set({ loadingGetActiveTopup: value }),
  setLoadingGetTrashedTopup: (value) => set({ loadingGetTrashedTopup: value }),
  setLoadingGetCardNumberTopup: (value) =>
    set({ loadingGetCardNumberTopup: value }),

  setLoadingCreateTopup: (value) => set({ loadingCreateTopup: value }),
  setLoadingUpdateTopup: (value) => set({ loadingUpdateTopup: value }),
  setLoadingTrashedTopup: (value) => set({ loadingTrashedTopup: value }),

  setErrorMonthStatusSuccess: (value) =>
    set({ errorMonthStatusSuccess: value }),
  setErrorYearStatusSuccess: (value) => set({ errorYearStatusSuccess: value }),
  setErrorMonthStatusFailed: (value) => set({ errorMonthStatusFailed: value }),
  setErrorYearStatusFailed: (value) => set({ errorYearStatusFailed: value }),
  setErrorMonthTopupMethod: (value) => set({ errorMonthTopupMethod: value }),
  setErrorYearTopupMethod: (value) => set({ errorYearTopupMethod: value }),
  setErrorMonthTopupAmount: (value) => set({ errorMonthTopupAmount: value }),
  setErrorYearTopupAmount: (value) => set({ errorYearTopupAmount: value }),

  setErrorGetTopups: (value) => set({ errorGetTopups: value }),
  setErrorGetTopup: (value) => set({ errorGetTopup: value }),
  setErrorGetActiveTopup: (value) => set({ errorGetActiveTopup: value }),
  setErrorGetTrashedTopup: (value) => set({ errorGetTrashedTopup: value }),
  setErrorGetCardNumberTopup: (value) =>
    set({ errorGetCardNumberTopup: value }),

  setErrorCreateTopup: (value) => set({ errorCreateTopup: value }),
  setErrorUpdateTopup: (value) => set({ errorUpdateTopup: value }),
  setErrorTrashedTopup: (value) => set({ errorTrashedTopup: value }),

  findMonthStatusSuccess: async (toast: any, year: number, month: number) => {
    set({ loadingMonthStatusSuccess: true, errorMonthStatusSuccess: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups/monthly-success", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });

      console.log("status: succes", response.data.data);

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
      const response = await myApi.get("/topups/yearly-success", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });

      console.log("status: year success", response.data.data);
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
      const response = await myApi.get("/topups/monthly-failed", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });
      console.log("status: month failed", response.data.data);

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
      const response = await myApi.get("/topups/yearly-failed", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });

      console.log("status: year failed", response.data.data);

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

  findMonthTopupMethod: async (toast: any, year: number) => {
    set({ loadingMonthTopupMethod: true, errorMonthTopupMethod: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups/monthly-methods", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      console.log("month method", response.data.data);

      set({
        monthTopupMethod: response.data.data,
        loadingMonthTopupMethod: false,
        errorMonthTopupMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTopupMethod: false }),
        (message: any) => set({ errorMonthTopupMethod: message }),
        toast,
      );
    }
  },

  findYearTopupMethod: async (toast: any, year: number) => {
    set({ loadingYearTopupMethod: true, errorYearTopupMethod: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups/yearly-methods", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      console.log("year method", response.data.data);

      set({
        yearTopupMethod: response.data.data,
        loadingYearTopupMethod: false,
        errorYearTopupMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTopupMethod: false }),
        (message: any) => set({ errorYearTopupMethod: message }),
        toast,
      );
    }
  },

  findMonthTopupAmount: async (toast, year: number) => {
    set({ loadingMonthTopupAmount: true, errorMonthTopupAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups/monthly-amounts", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });

      console.log("month amount", response.data.data);

      set({
        monthTopupAmount: response.data.data,
        loadingMonthTopupAmount: false,
        errorMonthTopupAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTopupAmount: false }),
        (message: any) => set({ errorMonthTopupAmount: message }),
        toast,
      );
    }
  },

  findYearTopupAmount: async (toast: any, year: number) => {
    set({ loadingYearTopupAmount: true, errorYearTopupAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups/yearly-amounts", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      console.log("year amount", response.data.data);

      set({
        yearTopupAmount: response.data.data,
        loadingYearTopupAmount: false,
        errorYearTopupAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTopupAmount: false }),
        (message: any) => set({ errorYearTopupAmount: message }),
        toast,
      );
    }
  },

  findMonthTopupMethodCard: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({ loadingMonthTopupMethod: true, errorMonthTopupMethod: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups/monthly-methods-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });

      set({
        monthTopupMethod: response.data,
        loadingMonthTopupMethod: false,
        errorMonthTopupMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTopupMethod: false }),
        (message: any) => set({ errorMonthTopupMethod: message }),
        toast,
      );
    }
  },

  findYearTopupMethodCard: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({ loadingYearTopupMethod: true, errorYearTopupMethod: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups/yearly-methods-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });
      set({
        yearTopupMethod: response.data,
        loadingYearTopupMethod: false,
        errorYearTopupMethod: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTopupMethod: false }),
        (message: any) => set({ errorYearTopupMethod: message }),
        toast,
      );
    }
  },

  findMonthTopupAmountCard: async (
    toast,
    year: number,
    card_number: string,
  ) => {
    set({ loadingMonthTopupAmount: true, errorMonthTopupAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups/monthly-amounts-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });
      set({
        monthTopupAmount: response.data,
        loadingMonthTopupAmount: false,
        errorMonthTopupAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTopupAmount: false }),
        (message: any) => set({ errorMonthTopupAmount: message }),
        toast,
      );
    }
  },

  findYearTopupAmountCard: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({ loadingYearTopupAmount: true, errorYearTopupAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups/yearly-amounts-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });
      set({
        yearTopupAmount: response.data,
        loadingYearTopupAmount: false,
        errorYearTopupAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTopupAmount: false }),
        (message: any) => set({ errorYearTopupAmount: message }),
        toast,
      );
    }
  },

  findAllTopups: async (req: FindAllTopup) => {
    set({ loadingGetTopups: true, errorGetTopups: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        topups: response.data.data,
        pagination: {
          currentPage: response.data.pagination.current_page,
          pageSize: response.data.pagination.page_size,
          totalItems: response.data.pagination.total_records,
          totalPages: response.data.pagination.total_pages,
        },
        loadingGetTopups: false,
        errorGetTopups: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTopups: false }),
        (message: any) => set({ errorGetTopups: message }),
        req.toast,
      );
    }
  },

  findByIdTopup: async (req: FindByIdTopup) => {
    set({ loadingGetTopup: true, errorGetTopup: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/topups/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response topup", response.data.data);

      set({
        topup: response.data.data,
        loadingGetTopup: false,
        errorGetTopup: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTopup: false }),
        (message: any) => set({ errorGetTopup: message }),
        req.toast,
      );
    }
  },

  findByActiveTopup: async (search: string, page: number, pageSize: number) => {
    set({ loadingGetActiveTopup: true, errorGetActiveTopup: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups/active", {
        params: { search, page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        topups: response.data.items,
        pagination: {
          currentPage: response.data.currentPage,
          pageSize: response.data.pageSize,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
        },
        loadingGetActiveTopup: false,
        errorGetActiveTopup: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetActiveTopup: false }),
        (message: any) => set({ errorGetActiveTopup: message }),
        null,
      );
    }
  },

  findByCardNumberTopup: async (req: FindByCardNumberTopup) => {
    set({ loadingGetCardNumberTopup: true, errorGetCardNumberTopup: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        `/topups/card-number/${req.cardNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      set({
        topup: response.data,
        loadingGetCardNumberTopup: false,
        errorGetCardNumberTopup: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetCardNumberTopup: false }),
        (message: any) => set({ errorGetCardNumberTopup: message }),
        req.toast,
      );
    }
  },

  createTopup: async (req: CreateTopup) => {
    set({ loadingCreateTopup: true, errorCreateTopup: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(
        "/topups/create",
        {
          card_number: req.card_number,
          topup_amount: req.topup_amount,
          topup_method: req.topup_method,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleMessageAction("topup", "create");

      set({ loadingCreateTopup: false, errorCreateTopup: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingCreateTopup: false }),
        (message: any) => set({ errorCreateTopup: message }),
        req.toast,
      );
    }
  },

  updateTopup: async (req: UpdateTopup) => {
    set({ loadingUpdateTopup: true, errorUpdateTopup: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(
        `/topups/update/${req.id}`,
        {
          card_number: req.card_number,
          topup_amount: req.topup_amount,
          topup_method: req.topup_method,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleMessageAction("topup", "update");

      set({ loadingUpdateTopup: false, errorUpdateTopup: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingUpdateTopup: false }),
        (message: any) => set({ errorUpdateTopup: message }),
        req.toast,
      );
    }
  },
  trashedTopup: async (req: TrashedTopup) => {
    set({ loadingTrashedTopup: true, errorTrashedTopup: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(`/topups/trashed/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleMessageAction("topup", "trashed");

      set({ loadingTrashedTopup: false, errorTrashedTopup: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingTrashedTopup: false }),
        (message: any) => set({ errorTrashedTopup: message }),
        req.toast,
      );
    }
  },
}));

export default useTopupStore;
