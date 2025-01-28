import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { handleMessageAction } from "@/helpers/message";
import { getAccessToken } from "@/store/auth";
import {
  DeletePermanentSaldo,
  FindAllSaldoTrashed,
  RestoreSaldoTrashed,
} from "@/types/domain/request";

import { SaldoTrashedStore } from "@/types/state";
import { create } from "zustand";

const useSaldoTrashedStore = create<SaldoTrashedStore>((set, get) => ({
  saldos: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingGetSaldosTrashed: false,
  loadingRestoreSaldoTrashed: false,
  loadingDeletePermanentSaldoTrashed: false,
  loadingRestoreAllSaldoTrashed: false,
  loadingDeletePermanentAllSaldoTrashed: false,

  errorGetSaldosTrashed: false,
  errorRestoreSaldoTrashed: false,
  errorDeletePermanentSaldoTrashed: false,
  errorRestoreAllSaldoTrashed: false,
  errorDeletePermanentAllSaldoTrashed: false,

  setLoadingGetSaldosTrashed: (value: boolean) =>
    set({ loadingGetSaldosTrashed: value }),
  setLoadingRestoreSaldoTrashed: (value: boolean) =>
    set({ loadingRestoreSaldoTrashed: value }),
  setLoadingDeletePermanentSaldoTrashed: (value: boolean) =>
    set({ loadingDeletePermanentSaldoTrashed: value }),
  setLoadingRestoreAllSaldoTrashed: (value: boolean) =>
    set({ loadingRestoreAllSaldoTrashed: value }),
  setLoadingDeletePermanentAllSaldoTrashed: (value: boolean) =>
    set({ loadingDeletePermanentAllSaldoTrashed: value }),

  setErrorGetSaldosTrashed: (value: boolean) =>
    set({ errorGetSaldosTrashed: value }),
  setErrorRestoreSaldoTrashed: (value: boolean) =>
    set({ errorRestoreSaldoTrashed: value }),
  setErrorDeletePermanentSaldoTrashed: (value: boolean) =>
    set({ errorDeletePermanentSaldoTrashed: value }),
  setErrorRestoreAllSaldoTrashed: (value: boolean) =>
    set({ errorRestoreAllSaldoTrashed: value }),
  setErrorDeletePermanentAllSaldoTrashed: (value: boolean) =>
    set({ errorDeletePermanentAllSaldoTrashed: value }),

  findAllSaldosTrashed: async (req: FindAllSaldoTrashed) => {
    set({ loadingGetSaldosTrashed: true, errorGetSaldosTrashed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/saldos/trashed", {
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
        loadingGetSaldosTrashed: false,
        errorGetSaldosTrashed: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetSaldosTrashed: false }),
        (message: any) => set({ errorGetSaldosTrashed: message }),
        req.toast,
      );
    }
  },

  restoreSaldoTrashed: async (req: RestoreSaldoTrashed) => {
    set({ loadingRestoreSaldoTrashed: true, errorRestoreSaldoTrashed: null });
    try {
      const token = getAccessToken();
      await myApi.post(`/saldos/restore/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingRestoreSaldoTrashed: false,
        errorRestoreSaldoTrashed: null,
      });
      handleMessageAction("saldo", "restore");

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreSaldoTrashed: false }),
        (message: any) => set({ errorRestoreSaldoTrashed: message }),
        req.toast,
      );

      return false;
    }
  },

  deletePermanentSaldo: async (req: DeletePermanentSaldo) => {
    set({
      loadingDeletePermanentSaldoTrashed: true,
      errorDeletePermanentSaldoTrashed: null,
    });
    try {
      const token = getAccessToken();
      await myApi.delete(`/saldos/permanent/${req.toast}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingDeletePermanentSaldoTrashed: false,
        errorDeletePermanentSaldoTrashed: null,
      });
      handleMessageAction("saldo", "deletePermanent");

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentSaldoTrashed: false }),
        (message: any) => set({ errorDeletePermanentSaldoTrashed: message }),
        req.toast,
      );

      return false;
    }
  },
  restoreSaldoAllTrashed: async (toast: any) => {
    set({
      loadingRestoreAllSaldoTrashed: true,
      errorRestoreAllSaldoTrashed: false,
    });

    try {
      await myApi.post("/saldos/restore/all");
      set({
        loadingRestoreAllSaldoTrashed: false,
        errorRestoreAllSaldoTrashed: null,
      });

      handleMessageAction("saldo", "restoreAll");

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreAllSaldoTrashed: false }),
        (message: any) => set({ errorRestoreAllSaldoTrashed: message }),
        toast,
      );

      return false;
    }
  },

  deletePermanentAllSaldo: async (toast: any) => {
    set({
      loadingDeletePermanentAllSaldoTrashed: true,
      errorDeletePermanentAllSaldoTrashed: false,
    });

    try {
      await myApi.post("/saldos/permanent/all");
      set({
        loadingDeletePermanentSaldoTrashed: false,
        errorDeletePermanentSaldoTrashed: null,
      });

      handleMessageAction("saldo", "deleteAllPermanent");
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentSaldoTrashed: false }),
        (message: any) => set({ errorDeletePermanentSaldoTrashed: message }),
        toast,
      );

      return false;
    }
  },
}));

export default useSaldoTrashedStore;
