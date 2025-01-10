import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { getAccessToken } from "@/store/auth";
import {
  DeletePermanentWithdraw,
  FindAllWithdrawTrashed,
  RestoreWithdrawTrashed,
} from "@/types/domain/request";
import { WithdrawTrashedStore } from "@/types/state";
import { create } from "zustand";

const useWithdrawTrashedStore = create<WithdrawTrashedStore>((set, get) => ({
  withdraws: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingGetWithdrawsTrashed: false,
  loadingRestoreWithdrawTrashed: false,
  loadingDeletePermanentWithdrawTrashed: false,
  loadingRestoreAllWithdrawTrashed: false,
  loadingDeletePermanentAllWithdrawTrashed: false,

  errorGetWithdrawsTrashed: false,
  errorRestoreWithdrawTrashed: false,
  errorDeletePermanentWithdrawTrashed: false,
  errorRestoreAllWithdrawTrashed: false,
  errorDeletePermanentAllWithdrawTrashed: false,

  setLoadingGetWithdrawsTrashed: (value: boolean) =>
    set({ loadingGetWithdrawsTrashed: value }),
  setLoadingRestoreWithdrawTrashed: (value: boolean) =>
    set({ loadingRestoreWithdrawTrashed: value }),
  setLoadingDeletePermanentWithdrawTrashed: (value: boolean) =>
    set({ loadingDeletePermanentWithdrawTrashed: value }),
  setLoadingRestoreAllWithdrawTrashed: (value: boolean) =>
    set({ loadingRestoreAllWithdrawTrashed: value }),
  setLoadingDeletePermanentAllWithdrawTrashed: (value: boolean) =>
    set({ loadingDeletePermanentAllWithdrawTrashed: value }),

  setErrorGetWithdrawsTrashed: (value: boolean) =>
    set({ errorGetWithdrawsTrashed: value }),
  setErrorRestoreWithdrawTrashed: (value: boolean) =>
    set({ errorRestoreWithdrawTrashed: value }),
  setErrorDeletePermanentWithdrawTrashed: (value: boolean) =>
    set({ errorDeletePermanentWithdrawTrashed: value }),
  setErrorRestoreAllWithdrawTrashed: (value: boolean) =>
    set({ errorRestoreAllWithdrawTrashed: value }),
  setErrorDeletePermanentAllWithdrawTrashed: (value: boolean) =>
    set({ errorDeletePermanentAllWithdrawTrashed: value }),

  findAllWithdrawsTrashed: async (req: FindAllWithdrawTrashed) => {
    set({ loadingGetWithdrawsTrashed: true, errorGetWithdrawsTrashed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/withdraws/trashed", {
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
        loadingGetWithdrawsTrashed: false,
        errorGetWithdrawsTrashed: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetWithdrawsTrashed: false }),
        (message: any) => set({ errorGetWithdrawsTrashed: message }),
        req.toast,
      );
    }
  },

  restoreWithdrawTrashed: async (req: RestoreWithdrawTrashed) => {
    set({
      loadingRestoreWithdrawTrashed: true,
      errorRestoreWithdrawTrashed: null,
    });
    try {
      const token = getAccessToken();
      await myApi.patch(`/withdraws/restore/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingRestoreWithdrawTrashed: false,
        errorRestoreWithdrawTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreWithdrawTrashed: false }),
        (message: any) => set({ errorRestoreWithdrawTrashed: message }),
        req.toast,
      );

      return false;
    }
  },

  deletePermanentWithdraw: async (req: DeletePermanentWithdraw) => {
    set({
      loadingDeletePermanentWithdrawTrashed: true,
      errorDeletePermanentWithdrawTrashed: null,
    });
    try {
      const token = getAccessToken();
      await myApi.delete(`/withdraws/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingDeletePermanentWithdrawTrashed: false,
        errorDeletePermanentWithdrawTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentWithdrawTrashed: false }),
        (message: any) => set({ errorDeletePermanentWithdrawTrashed: message }),
        req.toast,
      );
      return false;
    }
  },
  restoreWithdrawAllTrashed: async (toast: any) => {
    set({
      loadingRestoreAllWithdrawTrashed: true,
      errorRestoreAllWithdrawTrashed: false,
    });

    try {
      await myApi.post("/Withdraws/restore/all");
      set({
        loadingRestoreAllWithdrawTrashed: false,
        errorRestoreAllWithdrawTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreAllWithdrawTrashed: false }),
        (message: any) => set({ errorRestoreAllWithdrawTrashed: message }),
        toast,
      );

      return false;
    }
  },

  deletePermanentAllWithdraw: async (toast: any) => {
    set({
      loadingDeletePermanentAllWithdrawTrashed: true,
      errorDeletePermanentAllWithdrawTrashed: false,
    });

    try {
      await myApi.post("/withdraws/permanent/all");
      set({
        loadingDeletePermanentWithdrawTrashed: false,
        errorDeletePermanentWithdrawTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentWithdrawTrashed: false }),
        (message: any) => set({ errorDeletePermanentWithdrawTrashed: message }),
        toast,
      );

      return false;
    }
  },
}));

export default useWithdrawTrashedStore;
