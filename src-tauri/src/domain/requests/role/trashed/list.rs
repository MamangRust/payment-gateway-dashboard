use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct FindAllRoleTrashed {
    pub search: String,
    pub page: i32,
    pub page_size: i32,
}
