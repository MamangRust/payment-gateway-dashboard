import myApi from "@/helpers/api";
import { DeletePermanentRole } from "@/types/domain/request";
import { FindAllRoleTrashed, RestoreRoleTrashed } from "@/types/domain/request";
import {
  ApiResponsePaginationRoleDeleteAt,
  ApiResponseRole,
  ApiResponseRoleAll,
  ApiResponseRoleDelete,
} from "@/types/model";

class RoleTrashedService {
  async findAllRolesTrashed(
    req: FindAllRoleTrashed,
    access_token: string,
  ): Promise<ApiResponsePaginationRoleDeleteAt> {
    try {
      const response = await myApi.get("/role/trashed", {
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
  async restoreRoleTrashed(
    req: RestoreRoleTrashed,
    access_token: string,
  ): Promise<ApiResponseRole["data"]> {
    try {
      const response = await myApi.post(`/role/restore/${req.id}`, {
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
  async deletePermanentRole(
    req: DeletePermanentRole,
    access_token: string,
  ): Promise<ApiResponseRoleDelete> {
    try {
      const response = await myApi.delete(`/role/permanent/${req.id}`, {
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
  async restoreRoleAllTrashed(
    access_token: string,
  ): Promise<ApiResponseRoleAll> {
    try {
      const response = await myApi.post(`/role/restore/all`, null, {
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
  async deletePermanentAllRole(
    access_token: string,
  ): Promise<ApiResponseRoleAll> {
    try {
      const response = await myApi.post(`/role/permanent/all`, null, {
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

export default new RoleTrashedService();
