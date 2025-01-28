import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { handleMessageAction } from "@/helpers/message";
import { getAccessToken } from "@/store/auth";
import {
  DeletePermanentUser,
  FindAllUserTrashed,
  RestoreUserTrashed,
} from "@/types/domain/request";
import { UserTrashedStore } from "@/types/state";
import { create } from "zustand";

const useUserTrashedStore = create<UserTrashedStore>((set, get) => ({
  users: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingGetUsersTrashed: false,
  loadingRestoreUserTrashed: false,
  loadingDeletePermanentUserTrashed: false,
  loadingRestoreAllUserTrashed: false,
  loadingDeletePermanentAllUserTrashed: false,

  errorGetUsersTrashed: false,
  errorRestoreUserTrashed: false,
  errorDeletePermanentUserTrashed: false,
  errorRestoreAllUserTrashed: false,
  errorDeletePermanentAllUserTrashed: false,

  setLoadingGetUsersTrashed: (value: boolean) =>
    set({ loadingGetUsersTrashed: value }),
  setLoadingRestoreUserTrashed: (value: boolean) =>
    set({ loadingRestoreUserTrashed: value }),
  setLoadingDeletePermanentUserTrashed: (value: boolean) =>
    set({ loadingDeletePermanentUserTrashed: value }),
  setLoadingRestoreAllUserTrashed: (value: boolean) =>
    set({ loadingRestoreAllUserTrashed: value }),
  setLoadingDeletePermanentAllUserTrashed: (value: boolean) =>
    set({ loadingDeletePermanentAllUserTrashed: value }),

  setErrorGetUsersTrashed: (value: boolean) =>
    set({ errorGetUsersTrashed: value }),
  setErrorRestoreUserTrashed: (value: boolean) =>
    set({ errorRestoreUserTrashed: value }),
  setErrorDeletePermanentUserTrashed: (value: boolean) =>
    set({ errorDeletePermanentUserTrashed: value }),
  setErrorRestoreAllUserTrashed: (value: boolean) =>
    set({ errorRestoreAllUserTrashed: value }),
  setErrorDeletePermanentAllUserTrashed: (value: boolean) =>
    set({ errorDeletePermanentAllUserTrashed: value }),

  findAllUsersTrashed: async (req: FindAllUserTrashed) => {
    set({ loadingGetUsersTrashed: true, errorGetUsersTrashed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/user/trashed", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        users: response.data.data,
        pagination: {
          currentPage: response.data.pagination.current_page,
          pageSize: response.data.pagination.page_size,
          totalItems: response.data.pagination.total_records,
          totalPages: response.data.pagination.total_pages,
        },
        loadingGetUsersTrashed: false,
        errorGetUsersTrashed: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetUsersTrashed: false }),
        (message: any) => set({ errorGetUsersTrashed: message }),
        req.toast,
      );
    }
  },

  restoreUserTrashed: async (req: RestoreUserTrashed) => {
    set({ loadingRestoreUserTrashed: true, errorRestoreUserTrashed: null });
    try {
      const token = getAccessToken();
      await myApi.post(`/users/restore/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleMessageAction("user", "restore");

      set({ loadingRestoreUserTrashed: false, errorRestoreUserTrashed: null });
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreUserTrashed: false }),
        (message: any) => set({ errorRestoreUserTrashed: message }),

        req.toast,
      );
      return false;
    }
  },

  deletePermanentUser: async (req: DeletePermanentUser) => {
    set({
      loadingDeletePermanentUserTrashed: true,
      errorDeletePermanentUserTrashed: null,
    });
    try {
      const token = getAccessToken();
      await myApi.delete(`/users/permanent/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        loadingDeletePermanentUserTrashed: false,
        errorDeletePermanentUserTrashed: null,
      });

      handleMessageAction("user", "deletePermanent");

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentUserTrashed: false }),
        (message: any) => set({ errorDeletePermanentUserTrashed: message }),
        req.toast,
      );

      return false;
    }
  },
  restoreUserAllTrashed: async (toast: any) => {
    set({
      loadingRestoreAllUserTrashed: true,
      errorRestoreAllUserTrashed: false,
    });

    try {
      await myApi.post("/users/restore/all");
      set({
        loadingRestoreAllUserTrashed: false,
        errorRestoreAllUserTrashed: null,
      });

      handleMessageAction("user", "restoreAll");
      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingRestoreAllUserTrashed: false }),
        (message: any) => set({ errorRestoreAllUserTrashed: message }),
        toast,
      );

      return false;
    }
  },

  deletePermanentAllUser: async (toast: any) => {
    set({
      loadingDeletePermanentAllUserTrashed: true,
      errorDeletePermanentAllUserTrashed: false,
    });

    try {
      await myApi.post("/users/permanent/all");
      set({
        loadingDeletePermanentUserTrashed: false,
        errorDeletePermanentUserTrashed: null,
      });
      handleMessageAction("user", "deleteAllPermanent");

      return true;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingDeletePermanentUserTrashed: false }),
        (message: any) => set({ errorDeletePermanentUserTrashed: message }),
        toast,
      );
      return false;
    }
  },
}));

export default useUserTrashedStore;
