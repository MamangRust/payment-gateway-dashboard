use serde::{Deserialize, Serialize};

pub mod card;
pub mod merchant;
pub mod role;
pub mod saldo;
pub mod topup;
pub mod transaction;
pub mod transfer;
pub mod user;
pub mod withdraw;

#[derive(Serialize, Deserialize, Debug)]
pub struct PaginationMeta {
    pub current_page: i32,
    pub page_size: i32,
    pub total_pages: i32,
    pub total_records: i32,
}
