import { TopupStore } from "@/types/state/topup/topup";
import { create } from "zustand";
import { getAccessToken } from "../auth";
import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import {
  CreateTopup,
  FindAllTopup,
  FindByIdTopup,
  UpdateTopup,
} from "@/types/domain/request/topup";
import { FindByCardNumberTopup } from "@/types/domain/request/topup/findByCardNumber";
import { TrashedTopup } from "@/types/domain/request/topup/trashed";

const useTopupStore = create<TopupStore>((set, get) => ({
  topups: null,
  topup: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

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

  setLoadingGetTopups: (value) => set({ loadingGetTopups: value }),
  setLoadingGetTopup: (value) => set({ loadingGetTopup: value }),
  setLoadingGetActiveTopup: (value) => set({ loadingGetActiveTopup: value }),
  setLoadingGetTrashedTopup: (value) => set({ loadingGetTrashedTopup: value }),
  setLoadingGetCardNumberTopup: (value) =>
    set({ loadingGetCardNumberTopup: value }),

  setLoadingCreateTopup: (value) => set({ loadingCreateTopup: value }),
  setLoadingUpdateTopup: (value) => set({ loadingUpdateTopup: value }),
  setLoadingTrashedTopup: (value) => set({ loadingTrashedTopup: value }),

  setErrorGetTopups: (value) => set({ errorGetTopups: value }),
  setErrorGetTopup: (value) => set({ errorGetTopup: value }),
  setErrorGetActiveTopup: (value) => set({ errorGetActiveTopup: value }),
  setErrorGetTrashedTopup: (value) => set({ errorGetTrashedTopup: value }),
  setErrorGetCardNumberTopup: (value) =>
    set({ errorGetCardNumberTopup: value }),

  setErrorCreateTopup: (value) => set({ errorCreateTopup: value }),
  setErrorUpdateTopup: (value) => set({ errorUpdateTopup: value }),
  setErrorTrashedTopup: (value) => set({ errorTrashedTopup: value }),

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
      set({
        topup: response.data,
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
      const response = await myApi.post("/topups", req, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const response = await myApi.put(`/topups/${req.id}`, req, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const response = await myApi.patch(`/topups/trashed/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
