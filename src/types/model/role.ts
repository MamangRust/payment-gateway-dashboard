import { PaginationMeta } from "./card";

export interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface RoleTrashed extends Role {
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
  data?: Role;
}

export interface ApiResponsesRole {
  status: string;
  message: string;
  data: Role[];
}

export interface ApiResponsePaginationRole {
  status: string;
  message: string;
  data: Role[];
  pagination: PaginationMeta;
}

export interface ApiResponsePaginationRoleDeleteAt {
  status: string;
  message: string;
  data: RoleTrashed[];
  pagination: PaginationMeta;
}
