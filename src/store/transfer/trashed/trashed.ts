import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { getAccessToken } from "@/store/auth";
import {
  DeletePermanentTransfer,
  FindAllTransferTrashed,
  RestoreTransferTrashed,
} from "@/types/domain/request";
import { TransferTrashedStore } from "@/types/state";
import { create } from "zustand";

const useTransferTrashedStore = create<TransferTrashedStore>((set, get) => ({
  transfers: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingGetTransfersTrashed: false,
  loadingRestoreTransferTrashed: false,
  loadingDeletePermanentTransferTrashed: false,
  loadingRestoreAllTransferTrashed: false,
  loadingDeletePermanentAllTransferTrashed: false,

  errorGetTransfersTrashed: false,
  errorRestoreTransferTrashed: false,
  errorDeletePermanentTransferTrashed: false,
  errorRestoreAllTransferTrashed: false,
  errorDeletePermanentAllTransferTrashed: false,

  setLoadingGetTransfersTrashed: (value: boolean) =>
    set({ loadingGetTransfersTrashed: value }),
  setLoadingRestoreTransferTrashed: (value: boolean) =>
    set({ loadingRestoreTransferTrashed: value }),
  setLoadingDeletePermanentTransferTrashed: (value: boolean) =>
    set({ loadingDeletePermanentTransferTrashed: value }),
  setLoadingRestoreAllTransferTrashed: (value: boolean) =>
    set({ loadingRestoreAllTransferTrashed: value }),
  setLoadingDeletePermanentAllTransferTrashed: (value: boolean) =>
    set({ loadingDeletePermanentAllTransferTrashed: value }),

  setErrorGetTransfersTrashed: (value: boolean) =>
    set({ errorGetTransfersTrashed: value }),
  setErrorRestoreTransferTrashed: (value: boolean) =>
    set({ errorRestoreTransferTrashed: value }),
  setErrorDeletePermanentTransferTrashed: (value: boolean) =>
    set({ errorDeletePermanentTransferTrashed: value }),
  setErrorRestoreAllTransferTrashed: (value: boolean) =>
    set({ errorRestoreAllTransferTrashed: value }),
  setErrorDeletePermanentAllTransferTrashed: (value: boolean) =>
    set({ errorDeletePermanentAllTransferTrashed: value }),

  findAllTransfersTrashed: async (req: FindAllTransferTrashed) => {
    set({ loadingGetTransfersTrashed: true, errorGetTransfersTrashed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/trashed", {
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
        loadingGetTransfersTrashed: false,
        errorGetTransfersTrashed: null,
      });

      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTransfersTrashed: false }),
        (message: any) => set({ errorGetTransfersTrashed: message }),
        req.toast,
      );
    }
  },

  restoreTransferTrashed: async (req: RestoreTransferTrashed) => {
    set({
      loadingRestoreTransferTrashed: true,
      errorRestoreTransferTrashed: null,
    });
    try {
      const token = getAccessToken();
      await myApi.patch(`/transfers/restore/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingRestoreTransferTrashed: false,
        errorRestoreTransferTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreTransferTrashed: false }),
        (message: any) => set({ errorRestoreTransferTrashed: message }),
        req.toast,
      );
      return false;
    }
  },

  deletePermanentTransfer: async (req: DeletePermanentTransfer) => {
    set({
      loadingDeletePermanentTransferTrashed: true,
      errorDeletePermanentTransferTrashed: null,
    });
    try {
      const token = getAccessToken();
      await myApi.delete(`/transfers/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingDeletePermanentTransferTrashed: false,
        errorDeletePermanentTransferTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentTransferTrashed: false }),
        (message: any) => set({ errorDeletePermanentTransferTrashed: message }),
        req.toast,
      );

      return false;
    }
  },
  restoreTransferAllTrashed: async (toast: any) => {
    set({
      loadingRestoreAllTransferTrashed: true,
      errorRestoreAllTransferTrashed: false,
    });

    try {
      await myApi.post("/transfers/restore/all");
      set({
        loadingRestoreAllTransferTrashed: false,
        errorRestoreAllTransferTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreAllTransferTrashed: false }),
        (message: any) => set({ errorRestoreAllTransferTrashed: message }),
        toast,
      );

      return false;
    }
  },

  deletePermanentAllTransfer: async (toast: any) => {
    set({
      loadingDeletePermanentAllTransferTrashed: true,
      errorDeletePermanentAllTransferTrashed: false,
    });

    try {
      await myApi.post("/transfers/permanent/all");
      set({
        loadingDeletePermanentTransferTrashed: false,
        errorDeletePermanentTransferTrashed: null,
      });

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentTransferTrashed: false }),
        (message: any) => set({ errorDeletePermanentTransferTrashed: message }),
        toast,
      );
      return false;
    }
  },
}));

export default useTransferTrashedStore;
