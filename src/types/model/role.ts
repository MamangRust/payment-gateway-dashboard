import { PaginationMeta } from "./card";

export interface RoleResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface RoleResponseDeleteAt extends RoleResponse {
  deleted_at: string;
}

export interface ApiResponseRoleAll {
  status: string;
  message: string;
}

export interface ApiResponseRoleDelete {
  status: string;
  message: string;
}

export interface ApiResponseRole {
  status: string;
  message: string;
  data?: RoleResponse;
}

export interface ApiResponsesRole {
  status: string;
  message: string;
  data: RoleResponse[];
}

export interface ApiResponsePaginationRole {
  status: string;
  message: string;
  data: RoleResponse[];
  pagination: PaginationMeta;
}

export interface ApiResponsePaginationRoleDeleteAt {
  status: string;
  message: string;
  data: RoleResponseDeleteAt[];
  pagination: PaginationMeta;
}
