import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { getAccessToken } from "@/store/auth";
import {
  DeletePermanentCard,
  FindAllTrashedCard,
  RestoreTrashedCard,
} from "@/types/domain/request/card";
import { CardTrashedStore } from "@/types/state";
import { create } from "zustand";

const useCardTrashedStore = create<CardTrashedStore>((set, get) => ({
  cards: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingGetCardsTrashed: false,
  loadingRestoreCardTrashed: false,
  loadingDeletePermanentCardTrashed: false,
  loadingRestoreAllCardTrashed: false,
  loadingDeletePermanentAllCardTrashed: false,

  errorGetCardsTrashed: null,
  errorRestoreCardTrashed: null,
  errorDeletePermanentCardTrashed: null,
  errorRestoreAllCardTrashed: null,
  errorDeletePermanentAllCardTrashed: null,

  setLoadingGetCardsTrashed: (value: boolean) =>
    set({ loadingGetCardsTrashed: value }),
  setLoadingRestoreCardTrashed: (value: boolean) =>
    set({ loadingRestoreCardTrashed: value }),
  setLoadingDeletePermanentCardTrashed: (value: boolean) =>
    set({ loadingDeletePermanentCardTrashed: value }),
  setLoadingRestoreAllCardTrashed: (value: boolean) =>
    set({ loadingRestoreAllCardTrashed: value }),
  setLoadingDeletePermanentAllCardTrashed: (value: boolean) =>
    set({ loadingDeletePermanentAllCardTrashed: value }),

  setErrorGetCardsTrashed: (value: string) =>
    set({ errorGetCardsTrashed: value }),
  setErrorRestoreCardTrashed: (value: string) =>
    set({ errorRestoreCardTrashed: value }),
  setErrorDeletePermanentCardTrashed: (value: string) =>
    set({ errorDeletePermanentCardTrashed: value }),
  setErrorRestoreAllCardTrashed: (value: string) =>
    set({ errorRestoreAllCardTrashed: value }),
  setErrorDeletePermanentAllCardTrashed: (value: string) =>
    set({ errorDeletePermanentAllCardTrashed: value }),

  findAllCardsTrashed: async (req: FindAllTrashedCard) => {
    set({ loadingGetCardsTrashed: true, errorGetCardsTrashed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/cards/trashed", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        cards: response.data.data,
        pagination: {
          currentPage: response.data.pagination.current_page,
          pageSize: response.data.pagination.page_size,
          totalItems: response.data.pagination.total_records,
          totalPages: response.data.pagination.total_pages,
        },
        loadingGetCardsTrashed: false,
        errorGetCardsTrashed: null,
      });

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetCardsTrashed: false }),
        (message: any) => set({ errorGetCardsTrashed: message }),
        req.toast,
      );

      return false;
    }
  },

  restoreCardTrashed: async (req: RestoreTrashedCard) => {
    set({ loadingRestoreCardTrashed: true, errorRestoreCardTrashed: null });
    try {
      const token = getAccessToken();
      await myApi.post(`/cards/restore/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loadingRestoreCardTrashed: false, errorRestoreCardTrashed: null });

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreCardTrashed: false }),
        (message: any) => set({ errorRestoreCardTrashed: message }),
        req.toast,
      );

      return false;
    }
  },

  deletePermanentCard: async (req: DeletePermanentCard) => {
    set({
      loadingDeletePermanentCardTrashed: true,
      errorDeletePermanentCardTrashed: null,
    });
    try {
      const token = getAccessToken();
      await myApi.post(`/cards/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingDeletePermanentCardTrashed: false,
        errorDeletePermanentCardTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentCardTrashed: false }),
        (message: any) => set({ errorDeletePermanentCardTrashed: message }),
        req.toast,
      );
      return false;
    }
  },
  restoreCardAllTrashed: async (toast: any) => {
    set({
      loadingRestoreAllCardTrashed: true,
      errorRestoreAllCardTrashed: null,
    });

    try {
      await myApi.post("/cards/restore/all");

      set({
        loadingDeletePermanentCardTrashed: false,
        errorDeletePermanentCardTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentCardTrashed: false }),
        (message: any) => set({ errorDeletePermanentCardTrashed: message }),
        toast,
      );
      return false;
    }
  },

  deletePermanentAllCard: async (toast: any) => {
    set({
      loadingDeletePermanentAllCardTrashed: true,
      errorDeletePermanentAllCardTrashed: null,
    });

    try {
      await myApi.post("/cards/permanent/all");
      set({
        loadingDeletePermanentCardTrashed: false,
        errorDeletePermanentCardTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentCardTrashed: false }),
        (message: any) => set({ errorDeletePermanentCardTrashed: message }),
        toast,
      );

      return false;
    }
  },
}));

export default useCardTrashedStore;
