import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { getAccessToken } from "@/store/auth";
import { DeletePermanentMerchant } from "@/types/domain/request/merchant/trashed/delete";
import { FindAllMerchantTrashed } from "@/types/domain/request/merchant/trashed/list";
import { RestoreMerchantTrashed } from "@/types/domain/request/merchant/trashed/restore";
import { MerchantTrashedStore } from "@/types/state";
import { create } from "zustand";

const useMerchantTrashedStore = create<MerchantTrashedStore>((set, get) => ({
  merchants: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingGetMerchantsTrashed: false,
  loadingRestoreMerchantTrashed: false,
  loadingDeletePermanentMerchantTrashed: false,
  loadingRestoreAllMerchantTrashed: false,
  loadingDeletePermanentAllMerchantTrashed: false,

  errorGetMerchantsTrashed: false,
  errorRestoreMerchantTrashed: false,
  errorDeletePermanentMerchantTrashed: false,
  errorRestoreAllMerchantTrashed: false,
  errorDeletePermanentAllMerchantTrashed: false,

  setLoadingGetMerchantsTrashed: (value: boolean) =>
    set({ loadingGetMerchantsTrashed: value }),
  setLoadingRestoreMerchantTrashed: (value: boolean) =>
    set({ loadingRestoreMerchantTrashed: value }),
  setLoadingDeletePermanentMerchantTrashed: (value: boolean) =>
    set({ loadingDeletePermanentMerchantTrashed: value }),
  setLoadingRestoreAllMerchantTrashed: (value: boolean) =>
    set({ loadingRestoreAllMerchantTrashed: value }),
  setLoadingDeletePermanentAllMerchantTrashed: (value: boolean) =>
    set({ loadingDeletePermanentAllMerchantTrashed: value }),

  setErrorGetMerchantsTrashed: (value: boolean) =>
    set({ errorGetMerchantsTrashed: value }),
  setErrorRestoreMerchantTrashed: (value: boolean) =>
    set({ errorRestoreMerchantTrashed: value }),
  setErrorDeletePermanentMerchantTrashed: (value: boolean) =>
    set({ errorDeletePermanentMerchantTrashed: value }),
  setErrorRestoreAllMerchantTrashed: (value: boolean) =>
    set({ errorRestoreAllMerchantTrashed: value }),
  setErrorDeletePermanentAllMerchantTrashed: (value: boolean) =>
    set({ errorDeletePermanentAllMerchantTrashed: value }),

  findAllMerchantsTrashed: async (req: FindAllMerchantTrashed) => {
    set({ loadingGetMerchantsTrashed: true, errorGetMerchantsTrashed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/merchants/trashed", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        merchants: response.data.data,
        pagination: {
          currentPage: response.data.pagination.current_page,
          pageSize: response.data.pagination.page_size,
          totalItems: response.data.pagination.total_records,
          totalPages: response.data.pagination.total_pages,
        },
        loadingGetMerchantsTrashed: false,
        errorGetMerchantsTrashed: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetMerchantsTrashed: false }),
        (message: any) => set({ errorGetMerchantsTrashed: message }),
        req.toast,
      );
    }
  },

  restoreMerchantTrashed: async (req: RestoreMerchantTrashed) => {
    set({
      loadingRestoreMerchantTrashed: true,
      errorRestoreMerchantTrashed: null,
    });
    try {
      const token = getAccessToken();
      await myApi.patch(`/merchants/restore/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingRestoreMerchantTrashed: false,
        errorRestoreMerchantTrashed: null,
      });

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreMerchantTrashed: false }),
        (message: any) => set({ errorRestoreMerchantTrashed: message }),
        req.toast,
      );

      return false;
    }
  },

  deletePermanentMerchant: async (req: DeletePermanentMerchant) => {
    set({
      loadingDeletePermanentMerchantTrashed: true,
      errorDeletePermanentMerchantTrashed: null,
    });
    try {
      const token = getAccessToken();
      await myApi.delete(`/merchants/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingDeletePermanentMerchantTrashed: false,
        errorDeletePermanentMerchantTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentMerchantTrashed: false }),
        (message: any) => set({ errorDeletePermanentMerchantTrashed: message }),
        req.toast,
      );

      return false;
    }
  },
  restoreMerchantAllTrashed: async (toast: any) => {
    set({
      loadingRestoreAllMerchantTrashed: true,
      errorRestoreAllMerchantTrashed: false,
    });

    try {
      await myApi.post("/merchants/restore/all");
      set({
        loadingRestoreAllMerchantTrashed: false,
        errorRestoreAllMerchantTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreAllMerchantTrashed: false }),
        (message: any) => set({ errorRestoreAllMerchantTrashed: message }),
        toast,
      );

      return false;
    }
  },

  deletePermanentAllMerchant: async (toast: any) => {
    set({
      loadingDeletePermanentAllMerchantTrashed: true,
      errorDeletePermanentAllMerchantTrashed: false,
    });

    try {
      await myApi.post("/merchants/permanent/all");
      set({
        loadingDeletePermanentMerchantTrashed: false,
        errorDeletePermanentMerchantTrashed: null,
      });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentMerchantTrashed: false }),
        (message: any) => set({ errorDeletePermanentMerchantTrashed: message }),
        toast,
      );
      return false;
    }
  },
}));

export default useMerchantTrashedStore;
