import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { getAccessToken } from "@/store/auth";
import {
  DeletePermanentTransaction,
  FindAllTransactionTrashed,
  RestoreTransactionTrashed,
} from "@/types/domain/request";
import { TransactionTrashedStore } from "@/types/state";
import { create } from "zustand";

const useTransactionTrashedStore = create<TransactionTrashedStore>(
  (set, get) => ({
    transactions: null,

    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    },

    loadingGetTransactionsTrashed: false,
    loadingRestoreTransactionTrashed: false,
    loadingDeletePermanentTransactionTrashed: false,
    loadingRestoreAllTransactionTrashed: false,
    loadingDeletePermanentAllTransactionTrashed: false,

    errorGetTransactionsTrashed: false,
    errorRestoreTransactionTrashed: false,
    errorDeletePermanentTransactionTrashed: false,
    errorRestoreAllTransactionTrashed: false,
    errorDeletePermanentAllTransactionTrashed: false,

    setLoadingGetTransactionsTrashed: (value: boolean) =>
      set({ loadingGetTransactionsTrashed: value }),
    setLoadingRestoreTransactionTrashed: (value: boolean) =>
      set({ loadingRestoreTransactionTrashed: value }),
    setLoadingDeletePermanentTransactionTrashed: (value: boolean) =>
      set({ loadingDeletePermanentTransactionTrashed: value }),
    setLoadingRestoreAllTransactionTrashed: (value: boolean) =>
      set({ loadingRestoreAllTransactionTrashed: value }),
    setLoadingDeletePermanentAllTransactionTrashed: (value: boolean) =>
      set({ loadingDeletePermanentAllTransactionTrashed: value }),

    setErrorGetTransactionsTrashed: (value: boolean) =>
      set({ errorGetTransactionsTrashed: value }),
    setErrorRestoreTransactionTrashed: (value: boolean) =>
      set({ errorRestoreTransactionTrashed: value }),
    setErrorDeletePermanentTransactionTrashed: (value: boolean) =>
      set({ errorDeletePermanentTransactionTrashed: value }),
    setErrorRestoreAllTransactionTrashed: (value: boolean) =>
      set({ errorRestoreAllTransactionTrashed: value }),
    setErrorDeletePermanentAllTransactionTrashed: (value: boolean) =>
      set({ errorDeletePermanentAllTransactionTrashed: value }),

    findAllTransactionsTrashed: async (req: FindAllTransactionTrashed) => {
      set({
        loadingGetTransactionsTrashed: true,
        errorGetTransactionsTrashed: null,
      });
      try {
        const token = getAccessToken();
        const response = await myApi.get("/transactions/trashed", {
          params: {
            page: req.page,
            page_size: req.pageSize,
            search: req.search,
          },
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
          loadingGetTransactionsTrashed: false,
          errorGetTransactionsTrashed: null,
        });

        return response.data;
      } catch (err) {
        handleApiError(
          err,
          () => set({ loadingGetTransactionsTrashed: false }),
          (message: any) => set({ errorGetTransactionsTrashed: message }),
          req.toast,
        );
      }
    },

    restoreTransactionTrashed: async (req: RestoreTransactionTrashed) => {
      set({
        loadingRestoreTransactionTrashed: true,
        errorRestoreTransactionTrashed: null,
      });
      try {
        const token = getAccessToken();
        await myApi.patch(`/transactions/restore/${req.id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({
          loadingRestoreTransactionTrashed: false,
          errorRestoreTransactionTrashed: null,
        });
        return true;
      } catch (err) {
        handleApiError(
          err,
          () => set({ loadingRestoreTransactionTrashed: false }),
          (message: any) => set({ errorRestoreTransactionTrashed: message }),
          req.toast,
        );
        return false;
      }
    },

    deletePermanentTransaction: async (req: DeletePermanentTransaction) => {
      set({
        loadingDeletePermanentTransactionTrashed: true,
        errorDeletePermanentTransactionTrashed: null,
      });
      try {
        const token = getAccessToken();
        await myApi.delete(`/transactions/${req.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({
          loadingDeletePermanentTransactionTrashed: false,
          errorDeletePermanentTransactionTrashed: null,
        });
        return true;
      } catch (err) {
        handleApiError(
          err,
          () => set({ loadingDeletePermanentTransactionTrashed: false }),
          (message: any) =>
            set({ errorDeletePermanentTransactionTrashed: message }),
          req.toast,
        );
        return false;
      }
    },
    restoreTransactionAllTrashed: async (toast: any) => {
      set({
        loadingRestoreAllTransactionTrashed: true,
        errorRestoreAllTransactionTrashed: false,
      });

      try {
        await myApi.post("/transactions/restore/all");
        set({
          loadingRestoreAllTransactionTrashed: false,
          errorRestoreAllTransactionTrashed: null,
        });
        return true;
      } catch (err) {
        handleApiError(
          err,
          () => set({ loadingRestoreAllTransactionTrashed: false }),
          (message: any) => set({ errorRestoreAllTransactionTrashed: message }),
          toast,
        );
        return false;
      }
    },

    deletePermanentAllTransaction: async (toast: any) => {
      set({
        loadingDeletePermanentAllTransactionTrashed: true,
        errorDeletePermanentAllTransactionTrashed: false,
      });

      try {
        const response = await myApi.post("/transactions/permanent/all");
        set({
          loadingDeletePermanentTransactionTrashed: false,
          errorDeletePermanentTransactionTrashed: null,
        });
        return response.data;
      } catch (err) {
        handleApiError(
          err,
          () => set({ loadingDeletePermanentTransactionTrashed: false }),
          (message: any) =>
            set({ errorDeletePermanentTransactionTrashed: message }),
          toast,
        );
      }
    },
  }),
);

export default useTransactionTrashedStore;
