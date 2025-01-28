import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { handleMessageAction } from "@/helpers/message";
import { getAccessToken } from "@/store/auth";
import {
  DeletePermanentTopup,
  FindAllTopupTrashed,
  RestoreTopupTrashed,
} from "@/types/domain/request/topup";
import { TopupTrashedStore } from "@/types/state";
import { create } from "zustand";

const useTopupTrashedStore = create<TopupTrashedStore>((set, get) => ({
  topups: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingGetTopupsTrashed: false,
  loadingRestoreTopupTrashed: false,
  loadingDeletePermanentTopupTrashed: false,
  loadingRestoreAllTopupTrashed: false,
  loadingDeletePermanentAllTopupTrashed: false,

  errorGetTopupsTrashed: false,
  errorRestoreTopupTrashed: false,
  errorDeletePermanentTopupTrashed: false,
  errorRestoreAllTopupTrashed: false,
  errorDeletePermanentAllTopupTrashed: false,

  setLoadingGetTopupsTrashed: (value: boolean) =>
    set({ loadingGetTopupsTrashed: value }),
  setLoadingRestoreTopupTrashed: (value: boolean) =>
    set({ loadingRestoreTopupTrashed: value }),
  setLoadingDeletePermanentTopupTrashed: (value: boolean) =>
    set({ loadingDeletePermanentTopupTrashed: value }),
  setLoadingRestoreAllTopupTrashed: (value: boolean) =>
    set({ loadingRestoreAllTopupTrashed: value }),
  setLoadingDeletePermanentAllTopupTrashed: (value: boolean) =>
    set({ loadingDeletePermanentAllTopupTrashed: value }),

  setErrorGetTopupsTrashed: (value: boolean) =>
    set({ errorGetTopupsTrashed: value }),
  setErrorRestoreTopupTrashed: (value: boolean) =>
    set({ errorRestoreTopupTrashed: value }),
  setErrorDeletePermanentTopupTrashed: (value: boolean) =>
    set({ errorDeletePermanentTopupTrashed: value }),
  setErrorRestoreAllTopupTrashed: (value: boolean) =>
    set({ errorRestoreAllTopupTrashed: value }),
  setErrorDeletePermanentAllTopupTrashed: (value: boolean) =>
    set({ errorDeletePermanentAllTopupTrashed: value }),

  findAllTopupsTrashed: async (req: FindAllTopupTrashed) => {
    set({ loadingGetTopupsTrashed: true, errorGetTopupsTrashed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/topups/trashed", {
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
        loadingGetTopupsTrashed: false,
        errorGetTopupsTrashed: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTopupsTrashed: false }),
        (message: any) => set({ errorGetTopupsTrashed: message }),
        req.toast,
      );
    }
  },

  restoreTopupTrashed: async (req: RestoreTopupTrashed) => {
    set({ loadingRestoreTopupTrashed: true, errorRestoreTopupTrashed: null });
    try {
      const token = getAccessToken();
      await myApi.post(`/topups/restore/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingRestoreTopupTrashed: false,
        errorRestoreTopupTrashed: null,
      });
      handleMessageAction("topup", "restore");

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreTopupTrashed: false }),
        (message: any) => set({ errorRestoreTopupTrashed: message }),
        req.toast,
      );

      return false;
    }
  },

  deletePermanentTopup: async (req: DeletePermanentTopup) => {
    set({
      loadingDeletePermanentTopupTrashed: true,
      errorDeletePermanentTopupTrashed: null,
    });
    try {
      const token = getAccessToken();
      await myApi.delete(`/topups/permanent/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingDeletePermanentTopupTrashed: false,
        errorDeletePermanentTopupTrashed: null,
      });
      handleMessageAction("topup", "deletePermanent");

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentTopupTrashed: false }),
        (message: any) => set({ errorDeletePermanentTopupTrashed: message }),
        req.toast,
      );

      return false;
    }
  },
  restoreTopupAllTrashed: async (toast: any) => {
    set({
      loadingRestoreAllTopupTrashed: true,
      errorRestoreAllTopupTrashed: false,
    });

    try {
      await myApi.post("/topups/restore/all");
      set({
        loadingRestoreAllTopupTrashed: false,
        errorRestoreAllTopupTrashed: null,
      });
      handleMessageAction("topup", "restoreAll");

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreAllTopupTrashed: false }),
        (message: any) => set({ errorRestoreAllTopupTrashed: message }),
        toast,
      );
      return false;
    }
  },

  deletePermanentAllTopup: async (toast: any) => {
    set({
      loadingDeletePermanentAllTopupTrashed: true,
      errorDeletePermanentAllTopupTrashed: false,
    });

    try {
      await myApi.post("/topups/permanent/all");
      set({
        loadingDeletePermanentTopupTrashed: false,
        errorDeletePermanentTopupTrashed: null,
      });
      handleMessageAction("topup", "deleteAllPermanent");

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentTopupTrashed: false }),
        (message: any) => set({ errorDeletePermanentTopupTrashed: message }),
        toast,
      );

      return false;
    }
  },
}));

export default useTopupTrashedStore;
