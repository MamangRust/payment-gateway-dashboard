use serde::{Deserialize, Serialize};

use super::card::PaginationMeta;

#[derive(Serialize, Deserialize)]
pub struct SaldoResponse {
    pub id: i32,
    pub card_number: String,
    pub total_balance: i32,
    pub withdraw_amount: i32,
    pub withdraw_time: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct SaldoResponseDeleteAt {
    pub id: i32,
    pub card_number: String,
    pub total_balance: i32,
    pub withdraw_amount: i32,
    pub withdraw_time: String,
    pub created_at: String,
    pub updated_at: String,
    pub deleted_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct SaldoMonthTotalBalanceResponse {
    pub month: String,
    pub year: String,
    pub total_balance: i32,
}

#[derive(Serialize, Deserialize)]
pub struct SaldoYearTotalBalanceResponse {
    pub year: String,
    pub total_balance: i32,
}

#[derive(Serialize, Deserialize)]
pub struct SaldoMonthBalanceResponse {
    pub month: String,
    pub total_balance: i32,
}

#[derive(Serialize, Deserialize)]
pub struct SaldoYearBalanceResponse {
    pub year: String,
    pub total_balance: i32,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseSaldo {
    pub status: String,
    pub message: String,
    pub data: SaldoResponse,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsesSaldo {
    pub status: String,
    pub message: String,
    pub data: Vec<SaldoResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseSaldoDelete {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseSaldoAll {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseMonthTotalSaldo {
    pub status: String,
    pub message: String,
    pub data: Vec<SaldoMonthTotalBalanceResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseYearTotalSaldo {
    pub status: String,
    pub message: String,
    pub data: Vec<SaldoYearTotalBalanceResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseMonthSaldoBalances {
    pub status: String,
    pub message: String,
    pub data: Vec<SaldoMonthBalanceResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseYearSaldoBalances {
    pub status: String,
    pub message: String,
    pub data: Vec<SaldoYearBalanceResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationSaldo {
    pub status: String,
    pub message: String,
    pub data: Vec<SaldoResponse>,
    pub pagination: PaginationMeta,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationSaldoDeleteAt {
    pub status: String,
    pub message: String,
    pub data: Vec<SaldoResponseDeleteAt>,
    pub pagination: PaginationMeta,
}
