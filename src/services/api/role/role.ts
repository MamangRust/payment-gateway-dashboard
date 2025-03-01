import myApi from "@/helpers/api";
import {
  CreateRole,
  FindAllRole,
  FindAllRoleTrashed,
  FindByIdRole,
  TrashedRole,
  UpdateRole,
} from "@/types/domain/request";
import {
  ApiResponsePaginationRole,
  ApiResponsePaginationRoleDeleteAt,
  ApiResponseRole,
} from "@/types/domain/response";

class RoleService {
  async findAllRoles(
    access_token: string,
    req: FindAllRole,
  ): Promise<ApiResponsePaginationRole> {
    try {
      const response = await myApi.get(`/role`, {
        params: {
          page: req.page,
          page_size: req.page_size,
          search: req.search,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status == 200) {
        return response.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }
  async findById(
    access_token: string,
    req: FindByIdRole,
  ): Promise<ApiResponseRole> {
    try {
      const response = await myApi.get(`/role/${req.id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
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

  async findByActive(
    access_token: string,
    req: FindAllRoleTrashed,
  ): Promise<ApiResponsePaginationRoleDeleteAt> {
    try {
      const response = await myApi.get(`/role/active`, {
        params: {
          page: req.page,
          page_size: req.page_size,
          search: req.search,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status == 200) {
        return response.data;
      }
      throw new Error(response.data.message || "Login failed.");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
  }

  async createRole(
    access_token: string,
    req: CreateRole,
  ): Promise<ApiResponseRole> {
    try {
      const response = await myApi.post(
        `/role/create`,
        {
          name: req.name,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
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
  async updateRole(
    access_token: string,
    req: UpdateRole,
  ): Promise<ApiResponseRole> {
    try {
      const response = await myApi.post(
        `/role/update/${req.role_id}`,
        {
          role: req.role_id,
          name: req.name,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
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
  async trashedRole(
    access_token: string,
    req: TrashedRole,
  ): Promise<ApiResponseRole> {
    try {
      const response = await myApi.post(`/role/trashed/${req.id}`, null, {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
}

export default new RoleService();
