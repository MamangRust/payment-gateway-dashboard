import myApi from "@/helpers/api";
import {
  CreateWithdraw,
  FindByCardNumberWithdraw,
  FindByIdWithdraw,
  TrashedWithdraw,
  UpdateWithdraw,
} from "@/types/domain/request";
import { FindAllWithdraw } from "@/types/domain/request/withdraw/list";
import {
  ApiResponsePaginationWithdraw,
  ApiResponsePaginationWithdrawDeleteAt,
  ApiResponseWithdraw,
  ApiResponseWithdrawMonthAmount,
  ApiResponseWithdrawMonthStatusFailed,
  ApiResponseWithdrawMonthStatusSuccess,
  ApiResponseWithdrawYearAmount,
  ApiResponseWithdrawYearStatusFailed,
  ApiResponseWithdrawYearStatusSuccess,
} from "@/types/model";

class WithdrawService {
  async findMonthStatusSuccess(
    access_token: string,
    year: number,
    month: number,
  ): Promise<ApiResponseWithdrawMonthStatusSuccess["data"]> {
    try {
      const response = await myApi.get("/withdraws/month-success", {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
          year,
          month,
        },
      });

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async findYearStatusSuccess(
    access_token: string,
    year: number,
  ): Promise<ApiResponseWithdrawYearStatusSuccess["data"]> {
    try {
      const response = await myApi.get("/withdraws/year-success", {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
          year,
        },
      });

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async findMonthStatusFailed(
    access_token: string,
    year: number,
    month: number,
  ): Promise<ApiResponseWithdrawMonthStatusFailed["data"]> {
    try {
      const response = await myApi.get("/withdraws/month-failed", {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
          year,
          month,
        },
      });

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async findYearStatusFailed(
    access_token: string,
    year: number,
  ): Promise<ApiResponseWithdrawYearStatusFailed["data"]> {
    try {
      const response = await myApi.get("/withdraws/year-failed", {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
          year,
        },
      });

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async findMonthWithdrawAmount(
    access_token: string,
    year: number,
  ): Promise<ApiResponseWithdrawMonthAmount["data"]> {
    try {
      const response = await myApi.get("/withdraws/monthly-amount", {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
          year,
        },
      });

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async findYearWithdrawAmount(
    access_token: string,
    year: number,
  ): Promise<ApiResponseWithdrawYearAmount["data"]> {
    try {
      const response = await myApi.get("/withdraws/yearly-amount", {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
          year,
        },
      });

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async findMonthWithdrawAmountByCard(
    access_token: string,
    year: number,
    card_number: string,
  ): Promise<ApiResponseWithdrawMonthAmount["data"]> {
    try {
      const response = await myApi.get("/withdraws/monthly-by-card", {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
          year,
          card_number,
        },
      });

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async findYearWithdrawAmountByCard(
    access_token: string,
    year: number,
    card_number: string,
  ): Promise<ApiResponseWithdrawYearAmount["data"]> {
    try {
      const response = await myApi.get("/withdraws/yearly-by-card", {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
          year,
          card_number,
        },
      });

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async findAllWithdraws(
    access_token: string,
    req: FindAllWithdraw,
  ): Promise<ApiResponsePaginationWithdraw> {
    try {
      const response = await myApi.get("/withdraws", {
        params: {
          page: req.page,
          page_size: req.page_size,
          search: req.search,
        },
        headers: { Authorization: `Bearer ${access_token}` },
      });

      if (response.status == 200) {
        return response.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }
  async findByIdWithdraw(
    access_token: string,
    req: FindByIdWithdraw,
  ): Promise<ApiResponseWithdraw["data"]> {
    try {
      const response = await myApi.get(`/withdraws/${req.id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async findByCardNumberWithdraw(
    access_token: string,
    req: FindByCardNumberWithdraw,
  ): Promise<ApiResponseWithdraw["data"]> {
    try {
      const response = await myApi.get(
        `/withdraws/card-number/${req.cardNumber}`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async findByActiveWithdraw(
    access_token: string,
    req: FindAllWithdraw,
  ): Promise<ApiResponsePaginationWithdrawDeleteAt> {
    try {
      const response = await myApi.get("/withdraws/active", {
        params: {
          page: req.page,
          page_size: req.page_size,
          search: req.search,
        },
        headers: { Authorization: `Bearer ${access_token}` },
      });

      if (response.status == 200) {
        return response.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async createWithdraw(
    access_token: string,
    req: CreateWithdraw,
  ): Promise<ApiResponseWithdraw["data"]> {
    try {
      const response = await myApi.post(
        "/withdraws/create",
        {
          card_number: req.card_number,
          withdraw_amount: req.withdraw_amount,
          withdraw_time: req.withdraw_time,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async updateWithdraw(
    access_token: string,
    req: UpdateWithdraw,
  ): Promise<ApiResponseWithdraw["data"]> {
    try {
      const response = await myApi.post(
        `/withdraws/update/${req.id}`,
        {
          withdraw_id: req.id,
          card_number: req.card_number,
          withdraw_amount: req.withdraw_amount,
          withdraw_time: req.withdraw_time,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }
  async trashedWithdraw(
    access_token: string,
    req: TrashedWithdraw,
  ): Promise<ApiResponseWithdraw["data"]> {
    try {
      const response = await myApi.post(`/withdraws/trashed/${req.id}`, null, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      if (response.status == 200) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }
}

export default new WithdrawService();
