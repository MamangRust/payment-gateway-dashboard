import { create } from "zustand";
import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { UserStore } from "@/types/state/user";
import {
  CreateUser,
  FindByIdUser,
  TrashedUser,
  UpdateUser,
} from "@/types/domain/request";
import { getAccessToken } from "../auth";
import { FindAllUserTrashed } from "@/types/domain/request/user/trashed/list";

import { handleMessageAction } from "@/helpers/message";

const useUserStore = create<UserStore>((set, get) => ({
  users: null,
  user: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingGetUsers: false,
  loadingGetUser: false,
  loadingGetActiveUsers: false,
  loadingGetTrashedUsers: false,
  loadingCreateUser: false,
  loadingUpdateUser: false,
  loadingTrashedUser: false,

  errorGetUsers: null,
  errorGetUser: null,
  errorGetActiveUsers: null,
  errorGetTrashedUsers: null,
  errorCreateUser: null,
  errorUpdateUser: null,
  errorTrashedUser: null,

  setErrorGetUsers: (value: string | null) => set({ errorGetUsers: value }),
  setErrorGetUser: (value: string | null) => set({ errorGetUser: value }),
  setErrorGetActiveUsers: (value: string | null) =>
    set({ errorGetActiveUsers: value }),
  setErrorGetTrashedUsers: (value: string | null) =>
    set({ errorGetTrashedUsers: value }),
  setErrorCreateUser: (value: string | null) => set({ errorCreateUser: value }),
  setErrorUpdateUser: (value: string | null) => set({ errorUpdateUser: value }),
  setErrorTrashedUser: (value: string | null) =>
    set({ errorTrashedUser: value }),

  setLoadingGetUsers: (value: boolean) => set({ loadingGetUsers: value }),
  setLoadingGetUser: (value: boolean) => set({ loadingGetUser: value }),
  setLoadingGetActiveUsers: (value: boolean) =>
    set({ loadingGetActiveUsers: value }),
  setLoadingGetTrashedUsers: (value: boolean) =>
    set({ loadingGetTrashedUsers: value }),
  setLoadingCreateUser: (value: boolean) => set({ loadingCreateUser: value }),
  setLoadingUpdateUser: (value: boolean) => set({ loadingUpdateUser: value }),
  setLoadingTrashedUser: (value: boolean) => set({ loadingTrashedUser: value }),

  findAllUsers: async (req: FindAllUserTrashed) => {
    set({ loadingGetUsers: true, errorGetUsers: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/user`, {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      set({
        users: response.data.data,
        pagination: {
          currentPage: response.data.pagination.current_page,
          pageSize: response.data.pagination.page_size,
          totalItems: response.data.pagination.total_records,
          totalPages: response.data.pagination.total_pages,
        },
        loadingGetUsers: false,
        errorGetUsers: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetUsers: false }),
        (message: any) => set({ errorGetUsers: message }),
        req.toast,
      );
    }
  },

  findById: async (req: FindByIdUser) => {
    set({ loadingGetUser: true, errorGetUser: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/user/${req.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        user: response.data.data,
        loadingGetUser: false,
        errorGetUser: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetUser: false }),
        (message: any) => set({ errorGetUser: message }),
        req.toast,
      );
    }
  },

  findByActive: async (search: string, page: number, pageSize: number) => {
    set({ loadingGetActiveUsers: true, errorGetActiveUsers: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/user/active`, {
        params: { page, pageSize, search },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        users: response.data.items,
        pagination: {
          currentPage: response.data.pagination.current_page,
          pageSize: response.data.pagination.page_size,
          totalItems: response.data.pagination.total_records,
          totalPages: response.data.pagination.total_pages,
        },
        loadingGetActiveUsers: false,
        errorGetActiveUsers: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetActiveUsers: false }),
        (message: any) => set({ errorGetActiveUsers: message }),
        null,
      );
    }
  },

  createUser: async (req: CreateUser) => {
    set({ loadingCreateUser: true, errorCreateUser: null });
    try {
      const token = getAccessToken();

      const response = await myApi.post(
        `/user/create`,
        {
          firstname: req.firstname,
          lastname: req.lastname,
          email: req.email,
          password: req.password,
          confirm_password: req.confirm_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status == 200) {
        handleMessageAction("user", "create");
        set({
          loadingCreateUser: false,
          errorCreateUser: null,
          user: response.data.data,
        });
        return true;
      } else {
        throw new Error("Create User gagal. Silahkan coba create lagi");
      }
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingCreateUser: false }),
        (message: any) => set({ errorCreateUser: message }),
        req.toast,
      );

      return false;
    }
  },

  updateUser: async (req: UpdateUser) => {
    set({ loadingUpdateUser: true, errorUpdateUser: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(
        `/user/update/${req.user_id}`,
        {
          user_id: req.user_id,
          firstname: req.firstname,
          lastname: req.lastname,
          email: req.email,
          password: req.password,
          confirm_password: req.confirm_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status == 200) {
        set({ loadingUpdateUser: false, errorUpdateUser: null });
        handleMessageAction("user", "update");

        return true;
      } else {
        throw new Error("Update User gagal. Silahkan update lagi");
      }
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingUpdateUser: false }),
        (message: any) => set({ errorUpdateUser: message }),
        req.toast,
      );

      return false;
    }
  },

  trashedUser: async (req: TrashedUser) => {
    set({ loadingTrashedUser: true, errorTrashedUser: null });

    try {
      const token = getAccessToken();
      const response = await myApi.post(`/user/trashed/${req.id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        handleMessageAction("user", "trashed");
        set({ loadingTrashedUser: false, errorTrashedUser: null });
        return true;
      } else {
        throw new Error("Trashed User Gagal. Silahkan coba lagi");
      }
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingTrashedUser: false }),
        (message: any) => set({ errorTrashedUser: message }),
        req.toast,
      );
      return false;
    }
  },
}));

export default useUserStore;
