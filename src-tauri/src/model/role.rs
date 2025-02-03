use serde::{Deserialize, Serialize};

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

