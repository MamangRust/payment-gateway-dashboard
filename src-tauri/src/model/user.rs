use serde::{Deserialize, Serialize};

use super::card::PaginationMeta;

#[derive(Serialize, Deserialize)]
pub struct UserResponse {
    pub id: i32,
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct UserResponseDeleteAt {
    pub id: i32,
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub created_at: String,
    pub updated_at: String,
    pub deleted_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseUser {
    pub status: String,
    pub message: String,
    pub data: Option<UserResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsesUser {
    pub status: String,
    pub message: String,
    pub data: Vec<UserResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseUserDelete {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseUserAll {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationUserDeleteAt {
    pub status: String,
    pub message: String,
    pub data: Vec<UserResponseDeleteAt>,
    pub pagination: PaginationMeta,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationUser {
    pub status: String,
    pub message: String,
    pub data: Vec<UserResponse>,
    pub pagination: PaginationMeta,
}
