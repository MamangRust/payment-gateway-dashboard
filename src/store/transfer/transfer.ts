import { TransferStore } from "@/types/state/transfer/transfer";
import { create } from "zustand";
import { getAccessToken } from "../auth";
import myApi from "@/helpers/api";
import { handleApiError } from "@/helpers/handleApi";
import {
  CreateTransfer,
  FindAllTransfer,
  FindByIdTransfer,
  TransferFrom,
  TransferTo,
  TrashedTransfer,
  UpdateTransfer,
} from "@/types/domain/request";
import { handleMessageAction } from "@/helpers/message";

const useTransferStore = create<TransferStore>((set, get) => ({
  transfers: null,
  transfer: null,

  monthStatusSuccess: null,
  yearStatusSuccess: null,

  monthStatusFailed: null,
  yearStatusFailed: null,

  monthTransferAmount: null,
  yearTransferAmount: null,

  monthTransferAmountSender: null,
  yearTransferAmountSender: null,

  monthTransferAmountReceiver: null,
  yearTransferAmountReceiver: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingMonthStatusSuccess: false,
  loadingYearStatusSuccess: false,
  loadingMonthStatusFailed: false,
  loadingYearStatusFailed: false,
  loadingMonthTransferAmount: false,
  loadingYearTransferAmount: false,

  loadingMonthTransferAmountSender: false,
  loadingYearTransferAmountSender: false,

  loadingMonthTransferAmountReceiver: false,
  loadingYearTransferAmountReceiver: false,

  loadingGetTransfers: false,
  loadingGetTransfer: false,
  loadingGetTransferFrom: false,
  loadingGetTransferTo: false,
  loadingGetActiveTransfer: false,
  loadingGetTrashedTransfer: false,

  loadingCreateTransfer: false,
  loadingUpdateTransfer: false,
  loadingTrashedTransfer: false,
  loadingRestoreTransfer: false,
  loadingPermanentTransfer: false,

  errorMonthStatusSuccess: null,
  errorYearStatusSuccess: null,
  errorMonthStatusFailed: null,
  errorYearStatusFailed: null,
  errorMonthTransferAmount: null,
  errorYearTransferAmount: null,

  errorMonthTransferAmountSender: null,
  errorYearTransferAmountSender: null,

  errorMonthTransferAmountReceiver: null,
  errorYearTransferAmountReceiver: null,

  errorGetTransfers: null,
  errorGetTransfer: null,
  errorGetTransferFrom: null,
  errorGetTransferTo: null,
  errorGetActiveTransfer: null,
  errorGetTrashedTransfer: null,

  errorCreateTransfer: null,
  errorUpdateTransfer: null,
  errorTrashedTransfer: null,
  errorRestoreTransfer: null,
  errorPermanentTransfer: null,

  setLoadingMonthStatusSuccess: (value) =>
    set({ loadingMonthStatusSuccess: value }),
  setLoadingYearStatusSuccess: (value) =>
    set({ loadingYearStatusSuccess: value }),
  setLoadingMonthStatusFailed: (value) =>
    set({ loadingMonthStatusFailed: value }),
  setLoadingYearStatusFailed: (value) =>
    set({ loadingYearStatusFailed: value }),
  setLoadingMonthTransferAmount: (value) =>
    set({ loadingMonthTransferAmount: value }),
  setLoadingYearTransferAmount: (value) =>
    set({ loadingYearTransferAmount: value }),

  setLoadingMonthTransferAmountSender: (value) =>
    set({ loadingMonthTransferAmountSender: value }),
  setLoadingYearTransferAmountSender: (value) =>
    set({ loadingYearTransferAmountSender: value }),

  setLoadingMonthTransferAmountReceiver: (value) =>
    set({ loadingMonthTransferAmountReceiver: value }),
  setLoadingYearTransferAmountReceiver: (value) =>
    set({ loadingYearTransferAmountReceiver: value }),

  setLoadingGetTransfers: (value) => set({ loadingGetTransfers: value }),
  setLoadingGetTransfer: (value) => set({ loadingGetTransfer: value }),
  setLoadingGetTransferFrom: (value) => set({ loadingGetTransferFrom: value }),
  setLoadingGetTransferTo: (value) => set({ loadingGetTransferTo: value }),
  setLoadingGetActiveTransfer: (value) =>
    set({ loadingGetActiveTransfer: value }),
  setLoadingGetTrashedTransfer: (value) =>
    set({ loadingGetTrashedTransfer: value }),

  setLoadingCreateTransfer: (value) => set({ loadingCreateTransfer: value }),
  setLoadingUpdateTransfer: (value) => set({ loadingUpdateTransfer: value }),
  setLoadingTrashedTransfer: (value) => set({ loadingTrashedTransfer: value }),

  setErrorMonthStatusSuccess: (value) =>
    set({ errorMonthStatusSuccess: value }),
  setErrorYearStatusSuccess: (value) => set({ errorYearStatusSuccess: value }),
  setErrorMonthStatusFailed: (value) => set({ errorMonthStatusFailed: value }),
  setErrorYearStatusFailed: (value) => set({ errorYearStatusFailed: value }),
  setErrorMonthTransferAmount: (value) =>
    set({ errorMonthTransferAmount: value }),
  setErrorYearTransferAmount: (value) =>
    set({ errorYearTransferAmount: value }),

  setErrorMonthTransferAmountSender: (value) =>
    set({ errorMonthTransferAmountSender: value }),
  setErrorYearTransferAmountSender: (value) =>
    set({ errorYearTransferAmountSender: value }),

  setErrorMonthTransferAmountReceiver: (value) =>
    set({ errorMonthTransferAmountReceiver: value }),
  setErrorYearTransferAmountReceiver: (value) =>
    set({ errorYearTransferAmountReceiver: value }),

  setErrorGetTransfers: (value) => set({ errorGetTransfers: value }),
  setErrorGetTransfer: (value) => set({ errorGetTransfer: value }),
  setErrorGetTransferFrom: (value) => set({ errorGetTransferFrom: value }),
  setErrorGetTransferTo: (value) => set({ errorGetTransferTo: value }),
  setErrorGetActiveTransfer: (value) => set({ errorGetActiveTransfer: value }),
  setErrorGetTrashedTransfer: (value) =>
    set({ errorGetTrashedTransfer: value }),

  setErrorCreateTransfer: (value) => set({ errorCreateTransfer: value }),
  setErrorUpdateTransfer: (value) => set({ errorUpdateTransfer: value }),
  setErrorTrashedTransfer: (value) => set({ errorTrashedTransfer: value }),

  findMonthStatusSuccess: async (toast: any, year: number, month: number) => {
    set({ loadingMonthStatusSuccess: true, errorMonthStatusSuccess: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/month-success", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });
      set({
        monthStatusSuccess: response.data.data,
        loadingMonthStatusSuccess: false,
        errorMonthStatusSuccess: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthStatusSuccess: false }),
        (message: any) => set({ errorMonthStatusSuccess: message }),
        toast,
      );
    }
  },

  findYearStatusSuccess: async (toast: any, year: number, month: number) => {
    set({ loadingYearStatusSuccess: true, errorYearStatusSuccess: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/year-success", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });
      set({
        yearStatusSuccess: response.data.data,
        loadingYearStatusSuccess: false,
        errorYearStatusSuccess: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearStatusSuccess: false }),
        (message: any) => set({ errorYearStatusSuccess: message }),
        toast,
      );
    }
  },

  findMonthStatusFailed: async (toast: any, year: number, month: number) => {
    set({ loadingMonthStatusFailed: true, errorMonthStatusFailed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/month-failed", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });
      set({
        monthStatusFailed: response.data.data,
        loadingMonthStatusFailed: false,
        errorMonthStatusFailed: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthStatusFailed: false }),
        (message: any) => set({ errorMonthStatusFailed: message }),
        toast,
      );
    }
  },

  findYearStatusFailed: async (toast: any, year: number, month: number) => {
    set({ loadingYearStatusFailed: true, errorYearStatusFailed: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/year-failed", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          month,
        },
      });
      set({
        yearStatusFailed: response.data.data,
        loadingYearStatusFailed: false,
        errorYearStatusFailed: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearStatusFailed: false }),
        (message: any) => set({ errorYearStatusFailed: message }),
        toast,
      );
    }
  },

  findMonthTransferAmount: async (toast: any, year: number) => {
    set({ loadingMonthTransferAmount: true, errorMonthTransferAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/monthly-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      set({
        monthTransferAmount: response.data.data,
        loadingMonthTransferAmount: false,
        errorMonthTransferAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTransferAmount: false }),
        (message: any) => set({ errorMonthTransferAmount: message }),
        toast,
      );
    }
  },

  findYearTransferAmount: async (toast: any, year: number) => {
    set({ loadingYearTransferAmount: true, errorYearTransferAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/yearly-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
        },
      });
      set({
        yearTransferAmount: response.data.data,
        loadingYearTransferAmount: false,
        errorYearTransferAmount: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTransferAmount: false }),
        (message: any) => set({ errorYearTransferAmount: message }),
        toast,
      );
    }
  },

  findMonthTransferAmountBySender: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({
      loadingMonthTransferAmountSender: true,
      errorMonthTransferAmountSender: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/monthly-by-sender", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });
      set({
        monthTransferAmountSender: response.data.data,
        loadingMonthTransferAmountSender: false,
        errorMonthTransferAmountSender: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTransferAmountSender: false }),
        (message: any) => set({ errorMonthTransferAmountSender: message }),
        toast,
      );
    }
  },

  findYearTransferAmountBySender: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({
      loadingYearTransferAmountSender: true,
      errorYearTransferAmountSender: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/yearly-by-sender", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });
      set({
        yearTransferAmountSender: response.data.data,
        loadingYearTransferAmountSender: false,
        errorYearTransferAmountSender: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTransferAmountSender: false }),
        (message: any) => set({ errorYearTransferAmountSender: message }),
        toast,
      );
    }
  },

  findMonthTransferAmountByReceiver: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({
      loadingMonthTransferAmountReceiver: true,
      errorMonthTransferAmountReceiver: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/monthly-by-receiver", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });
      set({
        monthTransferAmountReceiver: response.data.data,
        loadingMonthTransferAmountReceiver: false,
        errorMonthTransferAmountReceiver: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingMonthTransferAmountReceiver: false }),
        (message: any) => set({ errorMonthTransferAmountReceiver: message }),
        toast,
      );
    }
  },

  findYearTransferAmountByReceiver: async (
    toast: any,
    year: number,
    card_number: string,
  ) => {
    set({
      loadingYearTransferAmountReceiver: true,
      errorYearTransferAmountReceiver: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/yearly-by-receiver", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          year,
          card_number,
        },
      });
      set({
        yearTransferAmountReceiver: response.data.data,
        loadingYearTransferAmountReceiver: false,
        errorYearTransferAmountReceiver: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingYearTransferAmountReceiver: false }),
        (message: any) => set({ errorYearTransferAmountReceiver: message }),
        toast,
      );
    }
  },

  findAllTransfers: async (req: FindAllTransfer) => {
    set({ loadingGetTransfers: true, errorGetTransfers: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers", {
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
        loadingGetTransfers: false,
        errorGetTransfers: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTransfers: false }),
        (message: any) => set({ errorGetTransfers: message }),
        req.toast,
      );
    }
  },

  findByIdTransfer: async (req: FindByIdTransfer) => {
    set({ loadingGetTransfer: true, errorGetTransfer: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/transfers/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transfer: response.data.data,
        loadingGetTransfer: false,
        errorGetTransfer: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTransfer: false }),
        (message: any) => set({ errorGetTransfer: message }),
        req.toast,
      );
    }
  },

  findByTransferFrom: async (req: TransferFrom) => {
    set({ loadingGetTransferFrom: true, errorGetTransferFrom: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/transfers/from/${req.cardNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transfers: response.data.data,
        loadingGetTransferFrom: false,
        errorGetTransferFrom: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTransferFrom: false }),
        (message: any) => set({ errorGetTransferFrom: message }),
        req.toast,
      );
    }
  },

  findByTransferTo: async (req: TransferTo) => {
    set({ loadingGetTransferTo: true, errorGetTransferTo: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get(`/transfers/to/${req.cardNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transfers: response.data.data,
        loadingGetTransferTo: false,
        errorGetTransferTo: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetTransferTo: false }),
        (message: any) => set({ errorGetTransferTo: message }),
        req.toast,
      );
    }
  },

  findByActiveTransfer: async (
    search: string,
    page: number,
    pageSize: number,
  ) => {
    set({ loadingGetActiveTransfer: true, errorGetActiveTransfer: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/transfers/active", {
        params: { search, page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        transfers: response.data.items,
        pagination: {
          currentPage: response.data.currentPage,
          pageSize: response.data.pageSize,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
        },
        loadingGetActiveTransfer: false,
        errorGetActiveTransfer: null,
      });
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingGetActiveTransfer: false }),
        (message: any) => set({ errorGetActiveTransfer: message }),
        null,
      );
    }
  },

  createTransfer: async (req: CreateTransfer) => {
    set({ loadingCreateTransfer: true, errorCreateTransfer: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(
        "/transfers/create",
        {
          transfer_from: req.transfer_from,
          transfer_to: req.transfer_to,
          transfer_amount: req.transfer_amount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleMessageAction("transfer", "create");

      set({ loadingCreateTransfer: false, errorCreateTransfer: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingCreateTransfer: false }),
        (message: any) => set({ errorCreateTransfer: message }),
        req.toast,
      );
    }
  },

  updateTransfer: async (req: UpdateTransfer) => {
    set({ loadingUpdateTransfer: true, errorUpdateTransfer: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(
        `/transfers/update/${req.id}`,
        {
          transfer_id: req.id,
          transfer_from: req.transfer_from,
          transfer_to: req.transfer_to,
          transfer_amount: req.transfer_amount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleMessageAction("transfer", "update");

      set({ loadingUpdateTransfer: false, errorUpdateTransfer: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingUpdateTransfer: false }),
        (message: any) => set({ errorUpdateTransfer: message }),
        req.toast,
      );
    }
  },

  trashedTransfer: async (req: TrashedTransfer) => {
    set({ loadingTrashedTransfer: true, errorTrashedTransfer: null });
    try {
      const token = getAccessToken();
      const response = await myApi.post(`/transfers/trashed/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleMessageAction("transfer", "trashed");

      set({ loadingTrashedTransfer: false, errorTrashedTransfer: null });
      return response.data;
    } catch (err) {
      handleApiError(
        err,
        () => set({ loadingTrashedTransfer: false }),
        (message: any) => set({ errorTrashedTransfer: message }),
        req.toast,
      );
    }
  },
}));

export default useTransferStore;
