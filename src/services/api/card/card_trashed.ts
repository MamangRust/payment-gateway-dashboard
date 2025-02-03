import myApi from "@/helpers/api";
import {
  DeletePermanentCard,
  FindAllTrashedCard,
  RestoreTrashedCard,
} from "@/types/domain/request";
import {
  ApiResponseCard,
  ApiResponseCardAll,
  ApiResponseCardDelete,
  ApiResponsePaginationCardDeleteAt,
} from "@/types/model";

class CardTrashedService {
  async findAllCardsTrashed(
    req: FindAllTrashedCard,
    access_token: string,
  ): Promise<ApiResponsePaginationCardDeleteAt> {
    try {
      const response = await myApi.get("/card/trashed", {
        params: { page: req.page, page_size: req.pageSize, search: req.search },
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
  async restoreCardTrashed(
    req: RestoreTrashedCard,
    access_token: string,
  ): Promise<ApiResponseCard["data"]> {
    try {
      const response = await myApi.post(`/card/restore/${req.id}`, null, {
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
  async deletePermanentCard(
    req: DeletePermanentCard,
    access_token: string,
  ): Promise<ApiResponseCardDelete> {
    try {
      const response = await myApi.post(`/card/permanent/${req.id}`, null, {
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
  async restoreCardAllTrashed(
    access_token: string,
  ): Promise<ApiResponseCardAll> {
    try {
      const response = await myApi.post(`/card/restore/all`, null, {
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
  async deletePermanentAllCard(
    access_token: string,
  ): Promise<ApiResponseCardAll> {
    try {
      const response = await myApi.post(`/card/permanent/all`, null, {
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

export default new CardTrashedService();
