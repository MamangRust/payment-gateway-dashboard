use serde::{Deserialize, Serialize};

use super::card::PaginationMeta;

#[derive(Serialize, Deserialize)]
pub struct RoleResponse {
    pub id: i32,
    pub name: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct RoleResponseDeleteAt {
    pub id: i32,
    pub name: String,
    pub created_at: String,
    pub updated_at: String,
    pub deleted_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseRoleAll {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseRoleDelete {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseRole {
    pub status: String,
    pub message: String,
    pub data: Option<RoleResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsesRole {
    pub status: String,
    pub message: String,
    pub data: Vec<RoleResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationRole {
    pub status: String,
    pub message: String,
    pub data: Vec<RoleResponse>,
    pub pagination: Option<PaginationMeta>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationRoleDeleteAt {
    pub status: String,
    pub message: String,
    pub data: Vec<RoleResponseDeleteAt>,
    pub pagination: Option<PaginationMeta>,
}
