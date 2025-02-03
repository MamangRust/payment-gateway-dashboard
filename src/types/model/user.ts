import { PaginationMeta } from "./card";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserTrashed {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface ApiResponseUser {
  status: string;
  message: string;
  data: User;
}

export interface ApiResponsesUser {
  status: string;
  message: string;
  data: User[];
}

export interface ApiResponseUserDelete {
  status: string;
  message: string;
}

export interface ApiResponseUserAll {
  status: string;
  message: string;
}

export interface ApiResponsePaginationUserDeleteAt {
  status: string;
  message: string;
  data: UserTrashed[];
  pagination: PaginationMeta;
}

export interface ApiResponsePaginationUser {
  status: string;
  message: string;
  data: User[];
  pagination: PaginationMeta;
}
