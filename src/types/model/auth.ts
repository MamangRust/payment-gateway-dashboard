export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface ApiResponseLogin {
  status: string;
  message: string;
  data?: TokenResponse;
}

export interface ApiResponseRegister {
  status: string;
  message: string;
  data?: UserResponse;
}

export interface ApiResponseRefreshToken {
  status: string;
  message: string;
  data?: TokenResponse;
}

export interface ApiResponseGetMe {
  status: string;
  message: string;
  data?: UserResponse;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}
