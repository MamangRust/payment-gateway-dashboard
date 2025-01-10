import { TransferStore } from "@/types/state/transfer/transfer";
import { create } from "zustand";
import { getAccessToken } from "../auth";
import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import {
  CreateTransfer,
  FindAllTransfer,
  FindByIdTransfer,
  TransferFrom,
  TransferTo,
  TrashedTransfer,
  UpdateTransfer,
} from "@/types/domain/request";

const useTransferStore = create<TransferStore>((set, get) => ({
  transfers: null,
  transfer: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingGetTransfers: false,
  loadingGetTransfer: false,
  loadingGetTransferFrom: false,
  loadingGetTransferTo: false,
  loadingGetActiveTransfer: false,
  loadingGetTrashedTransfer: false,

  loadingCreateTransfer: false,
  loadingUpdateTransfer: false,
  loadingTrashedTransfer: false,
  loadingRestoreTransfer: false,
  loadingPermanentTransfer: false,

  errorGetTransfers: null,
  errorGetTransfer: null,
  errorGetTransferFrom: null,
  errorGetTransferTo: null,
  errorGetActiveTransfer: null,
  errorGetTrashedTransfer: null,

  errorCreateTransfer: null,
  errorUpdateTransfer: null,
  errorTrashedTransfer: null,
  errorRestoreTransfer: null,
  errorPermanentTransfer: null,

  setLoadingGetTransfers: (value) => set({ loadingGetTransfers: value }),
  setLoadingGetTransfer: (value) => set({ loadingGetTransfer: value }),
  setLoadingGetTransferFrom: (value) => set({ loadingGetTransferFrom: value }),
  setLoadingGetTransferTo: (value) => set({ loadingGetTransferTo: value }),
  setLoadingGetActiveTransfer: (value) =>
    set({ loadingGetActiveTransfer: value }),
  setLoadingGetTrashedTransfer: (value) =>
    set({ loadingGetTrashedTransfer: value }),

  setLoadingCreateTransfer: (value) => set({ loadingCreateTransfer: value }),
  setLoadingUpdateTransfer: (value) => set({ loadingUpdateTransfer: value }),
  setLoadingTrashedTransfer: (value) => set({ loadingTrashedTransfer: value }),

  setErrorGetTransfers: (value) => set({ errorGetTransfers: value }),
  setErrorGetTransfer: (value) => set({ errorGetTransfer: value }),
  setErrorGetTransferFrom: (value) => set({ errorGetTransferFrom: value }),
  setErrorGetTransferTo: (value) => set({ errorGetTransferTo: value }),
  setErrorGetActiveTransfer: (value) => set({ errorGetActiveTransfer: value }),
  setErrorGetTrashedTransfer: (value) =>
    set({ errorGetTrashedTransfer: value }),

  setErrorCreateTransfer: (value) => set({ errorCreateTransfer: value }),
  setErrorUpdateTransfer: (value) => set({ errorUpdateTransfer: value }),
  setErrorTrashedTransfer: (value) => set({ errorTrashedTransfer: value }),

  findAllTransfers: async (req: FindAllTransfer) => {
    set({ loadingGetTransfers: true, errorGetTransfers: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transfers: response.data.data,
        pagination: {
          currentPage: response.data.pagination.current_page,
          pageSize: response.data.pagination.page_size,
          totalItems: response.data.pagination.total_records,
          totalPages: response.data.pagination.total_pages,
        },
        loadingGetTransfers: false,
        errorGetTransfers: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTransfers: false }),
        (message: any) => set({ errorGetTransfers: message }),
        req.toast,
      );
    }
  },

  findByIdTransfer: async (req: FindByIdTransfer) => {
    set({ loadingGetTransfer: true, errorGetTransfer: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/transfers/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transfer: response.data,
        loadingGetTransfer: false,
        errorGetTransfer: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTransfer: false }),
        (message: any) => set({ errorGetTransfer: message }),
        req.toast,
      );
    }
  },

  findByTransferFrom: async (req: TransferFrom) => {
    set({ loadingGetTransferFrom: true, errorGetTransferFrom: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/transfers/from/${req.cardNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transfers: response.data,
        loadingGetTransferFrom: false,
        errorGetTransferFrom: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTransferFrom: false }),
        (message: any) => set({ errorGetTransferFrom: message }),
        req.toast,
      );
    }
  },

  findByTransferTo: async (req: TransferTo) => {
    set({ loadingGetTransferTo: true, errorGetTransferTo: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/transfers/to/${req.cardNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transfers: response.data,
        loadingGetTransferTo: false,
        errorGetTransferTo: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTransferTo: false }),
        (message: any) => set({ errorGetTransferTo: message }),
        req.toast,
      );
    }
  },

  findByActiveTransfer: async (
    search: string,
    page: number,
    pageSize: number,
  ) => {
    set({ loadingGetActiveTransfer: true, errorGetActiveTransfer: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/active", {
        params: { search, page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transfers: response.data.items,
        pagination: {
          currentPage: response.data.currentPage,
          pageSize: response.data.pageSize,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
        },
        loadingGetActiveTransfer: false,
        errorGetActiveTransfer: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetActiveTransfer: false }),
        (message: any) => set({ errorGetActiveTransfer: message }),
        null,
      );
    }
  },

  createTransfer: async (req: CreateTransfer) => {
    set({ loadingCreateTransfer: true, errorCreateTransfer: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post("/transfers", req, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loadingCreateTransfer: false, errorCreateTransfer: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingCreateTransfer: false }),
        (message: any) => set({ errorCreateTransfer: message }),
        req.toast,
      );
    }
  },

  updateTransfer: async (req: UpdateTransfer) => {
    set({ loadingUpdateTransfer: true, errorUpdateTransfer: null });
    try {
      const token = getAccessToken();
      const response = await myApi.put(`/transfers/${req.id}`, req, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loadingUpdateTransfer: false, errorUpdateTransfer: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingUpdateTransfer: false }),
        (message: any) => set({ errorUpdateTransfer: message }),
        req.toast,
      );
    }
  },

  trashedTransfer: async (req: TrashedTransfer) => {
    set({ loadingTrashedTransfer: true, errorTrashedTransfer: null });
    try {
      const token = getAccessToken();
      const response = await myApi.patch(`/transfers/trashed/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loadingTrashedTransfer: false, errorTrashedTransfer: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingTrashedTransfer: false }),
        (message: any) => set({ errorTrashedTransfer: message }),
        req.toast,
      );
    }
  },
}));

export default useTransferStore;
