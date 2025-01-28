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
import { handleMessageAction } from "@/helpers/message";

const useCardStore = create<CardStore>((set, get) => ({
  cards: null,
  card: null,

  dashboard: null,
  dashboardCardNumber: null,

  monthBalance: null,
  yearBalance: null,

  monthTopupAmount: null,
  yearTopupAmount: null,

  monthWithdrawAmount: null,
  yearWithdrawAmount: null,

  monthTransactionAmount: null,
  yearTransactionAmount: null,

  monthTransferSender: null,
  yearTransferSender: null,

  monthTransferReceiver: null,
  yearTransferReceiver: null,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  loadingDashboard: false,
  loadingDashboardCardNumber: false,

  loadingMonthBalance: false,
  loadingYearBalance: false,

  loadingMonthTopupAmount: false,
  loadingYearTopupAmount: false,

  loadingMonthWithdrawAmount: false,
  loadingYearWithdrawAmount: false,

  loadingMonthTransaction: false,
  loadingYearTransaction: false,

  loadingMonthTransferSender: false,
  loadingYearTransferSender: false,

  loadingMonthTransferReceiver: false,
  loadingYearTransferReceiver: false,

  loadingGetCards: false,
  loadingGetCard: false,
  loadingGetCardByUser: false,
  loadingGetActiveCards: false,
  loadingGetTrashedCards: false,
  loadingGetCardByCardNumber: false,
  loadingCreateCard: false,
  loadingUpdateCard: false,
  loadingTrashedCard: false,

  errorDashboard: null,
  errorDashboardCardNumber: null,

  errorMonthBalance: null,
  errorYearBalance: null,

  errorMonthTopupAmount: null,
  errorYearTopupAmount: null,

  errorMonthWithdrawAmount: null,
  errorYearWithdrawAmount: null,

  errorMonthTransaction: null,
  errorYearTransaction: null,

  errorMonthTransferSender: null,
  errorYearTransferSender: null,

  errorMonthTransferReceiver: null,
  errorYearTransferReceiver: null,

  errorGetCards: null,
  errorGetCard: null,
  errorGetCardByUser: null,
  errorGetActiveCards: null,
  errorGetCardByCardNumber: null,
  errorCreateCard: null,
  errorUpdateCard: null,
  errorTrashedCard: null,

  setErrorDashboard: (value: string | null) => set({ errorDashboard: value }),
  setErrorDashboardCardNumber: (value: string | null) =>
    set({ errorDashboardCardNumber: value }),
  setErrorMonthBalance: (value: string | null) =>
    set({ errorMonthBalance: value }),
  setErrorYearBalance: (value: string | null) =>
    set({ errorYearBalance: value }),
  setErrorMonthTopupAmount: (value: string | null) =>
    set({ errorMonthTopupAmount: value }),
  setErrorYearTopupAmount: (value: string | null) =>
    set({ errorYearTopupAmount: value }),
  setErrorMonthWithdrawAmount: (value: string | null) =>
    set({ errorMonthWithdrawAmount: value }),
  setErrorYearWithdrawAmount: (value: string | null) =>
    set({ errorYearWithdrawAmount: value }),
  setErrorMonthTransaction: (value: string | null) =>
    set({ errorMonthTransaction: value }),
  setErrorYearTransaction: (value: string | null) =>
    set({ errorYearTransaction: value }),
  setErrorMonthTransferSender: (value: string | null) =>
    set({ errorMonthTransferSender: value }),
  setErrorYearTransferSender: (value: string | null) =>
    set({ errorYearTransferSender: value }),

  setErrorMonthTransferReceiver: (value: string | null) =>
    set({ errorMonthTransferReceiver: value }),
  setErrorYearTransferReceiver: (value: string | null) =>
    set({ errorYearTransferReceiver: value }),

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

  setLoadingDashboard: (value) => set({ loadingDashboard: value }),
  setLoadingDashboardCardNumber: (value) =>
    set({ loadingDashboardCardNumber: value }),
  setLoadingMonthBalance: (value) => set({ loadingMonthBalance: value }),
  setLoadingYearBalance: (value) => set({ loadingYearBalance: value }),
  setLoadingMonthTopupAmount: (value) =>
    set({ loadingMonthTopupAmount: value }),
  setLoadingYearTopupAmount: (value) => set({ loadingYearTopupAmount: value }),
  setLoadingMonthWithdrawAmount: (value) =>
    set({ loadingMonthWithdrawAmount: value }),
  setLoadingYearWithdrawAmount: (value) =>
    set({ loadingYearWithdrawAmount: value }),
  setLoadingMonthTransaction: (value) =>
    set({ loadingMonthTransaction: value }),
  setLoadingYearTransaction: (value) => set({ loadingYearTransaction: value }),
  setLoadingMonthTransferSender: (value) =>
    set({ loadingMonthTransferSender: value }),
  setLoadingYearTransferSender: (value) =>
    set({ loadingYearTransferSender: value }),
  setLoadingMonthTransferReceiver: (value) =>
    set({ loadingMonthTransferReceiver: value }),
  setLoadingYearTransferReceiver: (value) =>
    set({ loadingYearTransferReceiver: value }),

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

  dashboardCard: async (toast: any) => {
    set({ loadingDashboard: true, errorDashboard: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response", response.data);

      set({
        dashboard: response.data.data,
        loadingDashboard: false,
        errorDashboard: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingDashboard: false }),
        (message: any) => set({ errorDashboard: message }),
        toast,
      );
    }
  },

  dashboardCardCardNumber: async (toast: any, card_number: string) => {
    set({ loadingDashboardCardNumber: true, errorDashboardCardNumber: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/dashboard/" + card_number, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response", response.data.data);

      set({
        dashboardCardNumber: response.data.data,
        loadingDashboardCardNumber: false,
        errorDashboardCardNumber: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingDashboardCardNumber: false }),
        (message: any) => set({ errorDashboardCardNumber: message }),
        toast,
      );
    }
  },

  findMonthBalance: async (toast: any, year: number) => {
    set({ loadingMonthBalance: true, errorMonthBalance: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/monthly-balance", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year },
      });

      console.log("response month:", response.data.data);

      set({
        monthBalance: response.data.data,
        loadingMonthBalance: false,
        errorMonthBalance: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthBalance: false }),
        (message: any) => set({ errorMonthBalance: message }),
        toast,
      );
    }
  },

  findYearBalance: async (toast: any, year: number) => {
    set({ loadingYearBalance: true, errorYearBalance: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/yearly-balance", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year },
      });

      console.log("response: ", response.data.data);
      set({
        yearBalance: response.data.data,
        loadingYearBalance: false,
        errorYearBalance: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearBalance: false }),
        (message: any) => set({ errorYearBalance: message }),
        toast,
      );
    }
  },

  findMonthTopupAmount: async (toast: any, year: number) => {
    set({ loadingMonthTopupAmount: true, errorMonthTopupAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/monthly-topup-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year },
      });
      console.log("topup", response.data.data);

      set({
        monthTopupAmount: response.data.data,
        loadingMonthTopupAmount: false,
        errorMonthTopupAmount: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthTopupAmount: false }),
        (message: any) => set({ errorMonthTopupAmount: message }),
        toast,
      );
    }
  },

  findYearTopupAmount: async (toast: any, year: number) => {
    set({ loadingYearTopupAmount: true, errorYearTopupAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/yearly-topup-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year },
      });

      console.log("topup", response.data.data);

      set({
        yearTopupAmount: response.data.data,
        loadingYearTopupAmount: false,
        errorYearTopupAmount: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearTopupAmount: false }),
        (message: any) => set({ errorYearTopupAmount: message }),
        toast,
      );
    }
  },

  findMonthWithdrawAmount: async (toast: any, year: number) => {
    set({ loadingMonthWithdrawAmount: true, errorMonthWithdrawAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/monthly-withdraw-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year },
      });

      console.log("response withdraw:", response.data.data);

      set({
        monthWithdrawAmount: response.data.data,
        loadingMonthWithdrawAmount: false,
        errorMonthWithdrawAmount: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthWithdrawAmount: false }),
        (message: any) => set({ errorMonthWithdrawAmount: message }),
        toast,
      );
    }
  },

  findYearWithdrawAmount: async (toast: any, year: number) => {
    set({ loadingYearWithdrawAmount: true, errorYearWithdrawAmount: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/yearly-withdraw-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year },
      });

      console.log("response year withdraw", response.data);

      set({
        yearWithdrawAmount: response.data.data,
        loadingYearWithdrawAmount: false,
        errorYearWithdrawAmount: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearWithdrawAmount: false }),
        (message: any) => set({ errorYearWithdrawAmount: message }),
        toast,
      );
    }
  },

  findMonthlyTransferSenderAmount: async (toast: any, year: number) => {
    set({
      loadingMonthTransferSender: true,
      errorMonthTransferSender: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/monthly-transfer-sender-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year },
      });
      set({
        monthTransferSender: response.data.data,
        loadingMonthTransferSender: false,
        errorMonthTransferSender: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthTransferSender: false }),
        (message: any) => set({ errorMonthTransferSender: message }),
        toast,
      );
    }
  },

  findYearlyTransferSenderAmount: async (toast: any, year: number) => {
    set({
      loadingYearTransferSender: true,
      errorYearTransferSender: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/yearly-transfer-sender-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year },
      });
      set({
        yearTransferSender: response.data.data,
        loadingYearTransferSender: false,
        errorYearTransferSender: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearTransferSender: false }),
        (message: any) => set({ errorYearTransferSender: message }),
        toast,
      );
    }
  },

  findMonthlyTransferReceiverAmount: async (toast: any, year: number) => {
    set({
      loadingMonthTransferReceiver: true,
      errorMonthTransferReceiver: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/card/monthly-transfer-receiver-amount",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { year },
        },
      );
      set({
        monthTransferReceiver: response.data.data,
        loadingMonthTransferReceiver: false,
        errorMonthTransferReceiver: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthTransferReceiver: false }),
        (message: any) => set({ errorMonthTransferReceiver: message }),
        toast,
      );
    }
  },

  findYearlyTransferReceiverAmount: async (toast: any, year: number) => {
    set({
      loadingYearTransferReceiver: true,
      errorYearTransferReceiver: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/card/yearly-transfer-receiver-amount",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { year },
        },
      );
      set({
        yearTransferReceiver: response.data.data,
        loadingYearTransferReceiver: false,
        errorYearTransferReceiver: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearTransferReceiver: false }),
        (message: any) => set({ errorYearTransferReceiver: message }),
        toast,
      );
    }
  },

  findMonthlyTransactionAmount: async (toast: any, year: number) => {
    set({
      loadingMonthTransaction: true,
      errorMonthTransaction: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/monthly-transaction-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year },
      });
      console.log("response transaction:", response.data.data);
      set({
        monthTransactionAmount: response.data.data,
        loadingMonthTransaction: false,
        errorMonthTransaction: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthTransaction: false }),
        (message: any) => set({ errorMonthTransaction: message }),
        toast,
      );
    }
  },

  findYearlyTransactionAmount: async (toast: any, year: number) => {
    set({
      loadingYearTransaction: true,
      errorYearTransaction: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/yearly-transaction-amount", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year },
      });

      console.log("response transaction:", response.data.data);
      set({
        yearTransactionAmount: response.data.data,
        loadingYearTransaction: false,
        errorYearTransaction: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearTransaction: false }),
        (message: any) => set({ errorYearTransaction: message }),
        toast,
      );
    }
  },

  findMonthlyBalanceByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({ loadingMonthBalance: true, errorMonthBalance: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/monthly-balance-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year, card_number },
      });
      set({
        monthBalance: response.data.data,
        loadingMonthBalance: false,
        errorMonthBalance: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthBalance: false }),
        (message: any) => set({ errorMonthBalance: message }),
        toast,
      );
    }
  },

  findYearlyBalanceByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({ loadingYearBalance: true, errorYearBalance: null });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/yearly-balance-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year, card_number },
      });
      set({
        yearBalance: response.data.data,
        loadingYearBalance: false,
        errorYearBalance: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearBalance: false }),
        (message: any) => set({ errorYearBalance: message }),
        toast,
      );
    }
  },

  findMonthlyTopupAmountByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({
      loadingMonthTopupAmount: true,
      errorMonthTopupAmount: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/monthly-topup-amount-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year, card_number },
      });
      console.log("response", response.data.data);

      set({
        monthTopupAmount: response.data.data,
        loadingMonthTopupAmount: false,
        errorMonthTopupAmount: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthTopupAmount: false }),
        (message: any) => set({ errorMonthTopupAmount: message }),
        toast,
      );
    }
  },

  findYearlyTopupAmountByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({
      loadingYearTopupAmount: true,
      errorYearTopupAmount: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/yearly-topup-amount-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year, card_number },
      });

      console.log("response", response.data.data);

      set({
        yearTopupAmount: response.data.data,
        loadingYearTopupAmount: false,
        errorYearTopupAmount: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearTopupAmount: false }),
        (message: any) => set({ errorYearTopupAmount: message }),
        toast,
      );
    }
  },

  findMonthlyWithdrawAmountByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({
      loadingMonthWithdrawAmount: true,
      errorMonthWithdrawAmount: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/card/monthly-withdraw-amount-by-card",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { year, card_number },
        },
      );
      set({
        monthWithdrawAmount: response.data.data,
        loadingMonthWithdrawAmount: false,
        errorMonthWithdrawAmount: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthWithdrawAmount: false }),
        (message: any) => set({ errorMonthWithdrawAmount: message }),
        toast,
      );
    }
  },

  findYearlyWithdrawAmountByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({
      loadingYearWithdrawAmount: true,
      errorYearWithdrawAmount: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get("/card/yearly-withdraw-amount-by-card", {
        headers: { Authorization: `Bearer ${token}` },
        params: { year, card_number },
      });
      set({
        yearWithdrawAmount: response.data.data,
        loadingYearWithdrawAmount: false,
        errorYearWithdrawAmount: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearWithdrawAmount: false }),
        (message: any) => set({ errorYearWithdrawAmount: message }),
        toast,
      );
    }
  },

  findMonthlyTransactionAmountByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({
      loadingMonthTransaction: true,
      errorMonthTransaction: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/card/monthly-transaction-amount-by-card",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { year, card_number },
        },
      );
      set({
        monthTransactionAmount: response.data.data,
        loadingMonthTransaction: false,
        errorMonthTransaction: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthTransaction: false }),
        (message: any) => set({ errorMonthTransaction: message }),
        toast,
      );
    }
  },

  findYearlyTransactionAmountByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({
      loadingYearTransaction: true,
      errorYearTransaction: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/card/yearly-transaction-amount-by-card",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { year, card_number },
        },
      );
      set({
        yearTransactionAmount: response.data.data,
        loadingYearTransaction: false,
        errorYearTransaction: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearTransaction: false }),
        (message: any) => set({ errorYearTransaction: message }),
        toast,
      );
    }
  },

  findMonthlyTransferSenderAmountByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({
      loadingMonthTransferSender: true,
      errorMonthTransferSender: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/card/monthly-transfer-sender-amount-by-card",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { year, card_number },
        },
      );
      set({
        monthTransferSender: response.data.data,
        loadingMonthTransferSender: false,
        errorMonthTransferSender: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthTransferSender: false }),
        (message: any) => set({ errorMonthTransferSender: message }),
        toast,
      );
    }
  },

  findYearlyTransferSenderAmountByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({
      loadingYearTransferSender: true,
      errorYearTransferSender: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/card/yearly-transfer-sender-amount-by-card",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { year, card_number },
        },
      );
      console.log("response yer", response.data.data);

      set({
        yearTransferSender: response.data.data,
        loadingYearTransferSender: false,
        errorYearTransferSender: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearTransferSender: false }),
        (message: any) => set({ errorYearTransferSender: message }),
        toast,
      );
    }
  },

  findMonthlyTransferReceiverAmountByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({
      loadingMonthTransferReceiver: true,
      errorMonthTransferReceiver: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/card/monthly-transfer-receiver-amount-by-card",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { year, card_number },
        },
      );
      set({
        monthTransferReceiver: response.data.data,
        loadingMonthTransferReceiver: false,
        errorMonthTransferReceiver: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingMonthTransferReceiver: false }),
        (message: any) => set({ errorMonthTransferReceiver: message }),
        toast,
      );
    }
  },

  findYearlyTransferReceiverAmountByCard: async (
    toast: any,
    year: number,
    card_number: String,
  ) => {
    set({
      loadingYearTransferReceiver: true,
      errorYearTransferReceiver: null,
    });
    try {
      const token = getAccessToken();
      const response = await myApi.get(
        "/card/yearly-transfer-receiver-amount-by-card",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { year, card_number },
        },
      );
      set({
        yearTransferReceiver: response.data.data,
        loadingYearTransferReceiver: false,
        errorYearTransferReceiver: null,
      });
      return response.data;
    } catch (error) {
      handleApiError(
        error,
        () => set({ loadingYearTransferReceiver: false }),
        (message: any) => set({ errorYearTransferReceiver: message }),
        toast,
      );
    }
  },

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
      const response = await myApi.get(`/card/${req.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("response ", response.data.data);

      set({
        card: response.data.data,
        loadingGetCard: false,
        errorGetCard: null,
      });

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
      const response = await myApi.get(`/card/user/${req.id}`, {
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
      const response = await myApi.get(`/card/card_number/${req.cardNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response card_number", response.data.data);

      set({
        card: response.data.data,
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
      const response = await myApi.get("/card/active", {
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
      const response = await myApi.post(
        "/card/create",
        {
          user_id: req.user_id,
          card_type: req.card_type,
          expire_date: req.expire_date,
          cvv: req.cvv,
          card_provider: req.card_provider,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      handleMessageAction("card", "create");
      set({
        card: response.data.data,
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
      const response = await myApi.post(
        `/card/update/${req.card_id}`,
        {
          card_id: req.card_id,
          user_id: req.user_id,
          card_type: req.card_type,
          expire_date: req.expire_date,
          cvv: req.cvv,
          card_provider: req.card_provider,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("req update", req);
      console.log("response", response.data.data);

      handleMessageAction("card", "update");

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
      const response = await myApi.post(`/card/trashed/${req.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ loadingTrashedCard: false, errorTrashedCard: null });

      handleMessageAction("card", "trashed");

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
