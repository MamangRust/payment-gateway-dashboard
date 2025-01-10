import { create } from "zustand";
import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import { CardStore } from "@/types/state/card/card";
import {
  CreateCard,
  FindAllCard,
  FindByCardNumber,
  FindByIdCard,
  UpdateCard,
} from "@/types/domain/request";
import { getAccessToken } from "../auth";
import { FindByUser } from "@/types/domain/request/card/user";

const useCardStore = create<CardStore>((set, get) => ({
  cards: null,
  card: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingGetCards: false,
  loadingGetCard: false,
  loadingGetCardByUser: false,
  loadingGetActiveCards: false,
  loadingGetTrashedCards: false,
  loadingGetCardByCardNumber: false,
  loadingCreateCard: false,
  loadingUpdateCard: false,
  loadingTrashedCard: false,

  errorGetCards: null,
  errorGetCard: null,
  errorGetCardByUser: null,
  errorGetActiveCards: null,
  errorGetCardByCardNumber: null,
  errorCreateCard: null,
  errorUpdateCard: null,
  errorTrashedCard: null,

  setErrorGetCards: (value: string | null) => set({ errorGetCards: value }),
  setErrorGetCard: (value: string | null) => set({ errorGetCard: value }),
  setErrorGetCardByUser: (value: string | null) =>
    set({ errorGetCardByUser: value }),
  setErrorGetActiveCards: (value: string | null) =>
    set({ errorGetActiveCards: value }),

  setErrorGetCardByCardNumber: (value: string | null) =>
    set({ errorGetCardByCardNumber: value }),
  setErrorCreateCard: (value: string | null) => set({ errorCreateCard: value }),
  setErrorUpdateCard: (value: string | null) => set({ errorUpdateCard: value }),
  setErrorTrashedCard: (value: string | null) =>
    set({ errorTrashedCard: value }),

  setLoadingGetCards: (value: boolean) => set({ loadingGetCards: value }),
  setLoadingGetCard: (value: boolean) => set({ loadingGetCard: value }),
  setLoadingGetCardByUser: (value: boolean) =>
    set({ loadingGetCardByUser: value }),
  setLoadingGetActiveCards: (value: boolean) =>
    set({ loadingGetActiveCards: value }),

  setLoadingGetCardByCardNumber: (value: boolean) =>
    set({ loadingGetCardByCardNumber: value }),
  setLoadingCreateCard: (value: boolean) => set({ loadingCreateCard: value }),
  setLoadingUpdateCard: (value: boolean) => set({ loadingUpdateCard: value }),
  setLoadingTrashedCard: (value: boolean) => set({ loadingTrashedCard: value }),

  findAllCards: async (req: FindAllCard) => {
    set({ loadingGetCards: true, errorGetCards: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card", {
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
        loadingGetCards: false,
        errorGetCards: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingGetCards: false }),
        (message: any) => set({ errorGetCards: message }),
        req.toast,
      );
    }
  },

  findByIdCard: async (req: FindByIdCard) => {
    set({ loadingGetCard: true, errorGetCard: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/cards/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ card: response.data, loadingGetCard: false, errorGetCard: null });

      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetCard: false }),
        (message: any) => set({ errorGetCard: message }),
        req.toast,
      );
    }
  },

  findByUser: async (req: FindByUser) => {
    set({ loadingGetCardByUser: true, errorGetCardByUser: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/cards/user/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        cards: response.data,
        loadingGetCardByUser: false,
        errorGetCardByUser: null,
      });

      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetCardByUser: false }),
        (message: any) => set({ errorGetCardByUser: message }),
        req.toast,
      );
    }
  },

  findByCardNumber: async (req: FindByCardNumber) => {
    set({ loadingGetCardByCardNumber: true, errorGetCardByCardNumber: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/cards/number/${req.cardNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        card: response.data,
        loadingGetCardByCardNumber: false,
        errorGetCardByCardNumber: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetCardByCardNumber: false }),
        (message: any) => set({ errorGetCardByCardNumber: message }),
        req.toast,
      );
    }
  },

  findByActiveCard: async (search: string, page: number, pageSize: number) => {
    set({ loadingGetActiveCards: true, errorGetActiveCards: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/cards/active", {
        params: { page, pageSize, search },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        cards: response.data.items,
        pagination: {
          currentPage: response.data.currentPage,
          pageSize: response.data.pageSize,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
        },
        loadingGetActiveCards: false,
        errorGetActiveCards: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetActiveCards: false }),
        (message: any) => set({ errorGetActiveCards: message }),
        1,
      );
    }
  },

  createCard: async (req: CreateCard) => {
    set({ loadingCreateCard: true, errorCreateCard: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post("/cards", req, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        card: response.data,
        loadingCreateCard: false,
        errorCreateCard: null,
      });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingCreateCard: false }),
        (message: any) => set({ errorCreateCard: message }),
        req.toast,
      );
    }
  },

  updateCard: async (req: UpdateCard) => {
    set({ loadingUpdateCard: true, errorUpdateCard: null });
    try {
      const token = getAccessToken();
      const response = await myApi.put(`/cards/${req.id}`, req, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        card: response.data,
        loadingUpdateCard: false,
        errorUpdateCard: null,
      });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingUpdateCard: false }),
        (message: any) => set({ errorUpdateCard: message }),
        req.toast,
      );
    }
  },

  trashedCard: async (req: FindByIdCard) => {
    set({ loadingTrashedCard: true, errorTrashedCard: null });
    try {
      const token = getAccessToken();
      const response = await myApi.patch(`/cards/trashed/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loadingTrashedCard: false, errorTrashedCard: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingTrashedCard: false }),
        (message: any) => set({ errorTrashedCard: message }),
        req.toast,
      );
    }
  },
}));

export default useCardStore;
