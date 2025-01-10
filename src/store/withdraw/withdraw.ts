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

const useWithdrawStore = create<WithdrawStore>((set, get) => ({
  withdraws: null,
  withdraw: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

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
        withdraw: response.data,
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
      const response = await myApi.post("/withdraws", req, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const response = await myApi.put(`/withdraws/${req.id}`, req, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const response = await myApi.patch(`/withdraws/trashed/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
