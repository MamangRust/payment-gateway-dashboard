use crate::model::role::{RoleResponse, RoleResponseDeleteAt};

use super::PaginationMeta;
use serde::{Deserialize, Serialize};

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
