use serde::{Deserialize, Serialize};

use super::card::PaginationMeta;

#[derive(Serialize, Deserialize)]
pub struct TransactionResponse {
    pub id: i32,
    pub transaction_no: String,
    pub card_number: String,
    pub amount: i32,
    pub payment_method: String,
    pub merchant_id: i32,
    pub transaction_time: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct TransactionResponseDeleteAt {
    pub id: i32,
    pub transaction_no: String,
    pub card_number: String,
    pub amount: i32,
    pub payment_method: String,
    pub merchant_id: i32,
    pub transaction_time: String,
    pub created_at: String,
    pub updated_at: String,
    pub deleted_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct TransactionResponseMonthStatusSuccess {
    pub year: String,
    pub month: String,
    pub total_amount: i32,
    pub total_success: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransactionResponseYearStatusSuccess {
    pub year: String,
    pub total_amount: i32,
    pub total_success: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransactionResponseMonthStatusFailed {
    pub year: String,
    pub month: String,
    pub total_amount: i32,
    pub total_failed: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransactionResponseYearStatusFailed {
    pub year: String,
    pub total_amount: i32,
    pub total_failed: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransactionMonthMethodResponse {
    pub month: String,
    pub payment_method: String,
    pub total_transactions: i32,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransactionYearMethodResponse {
    pub year: String,
    pub payment_method: String,
    pub total_transactions: i32,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransactionMonthAmountResponse {
    pub month: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransactionYearlyAmountResponse {
    pub year: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransactionMonthStatusSuccess {
    pub status: String,
    pub message: String,
    pub data: Vec<TransactionResponseMonthStatusSuccess>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransactionYearStatusSuccess {
    pub status: String,
    pub message: String,
    pub data: Vec<TransactionResponseYearStatusSuccess>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransactionMonthStatusFailed {
    pub status: String,
    pub message: String,
    pub data: Vec<TransactionResponseMonthStatusFailed>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransactionYearStatusFailed {
    pub status: String,
    pub message: String,
    pub data: Vec<TransactionResponseYearStatusFailed>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransactionMonthMethod {
    pub status: String,
    pub message: String,
    pub data: Vec<TransactionMonthMethodResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransactionYearMethod {
    pub status: String,
    pub message: String,
    pub data: Vec<TransactionYearMethodResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransactionMonthAmount {
    pub status: String,
    pub message: String,
    pub data: Vec<TransactionMonthAmountResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransactionYearAmount {
    pub status: String,
    pub message: String,
    pub data: Vec<TransactionYearlyAmountResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransaction {
    pub status: String,
    pub message: String,
    pub data: Option<TransactionResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransactions {
    pub status: String,
    pub message: String,
    pub data: Vec<TransactionResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransactionDelete {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransactionAll {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationTransaction {
    pub status: String,
    pub message: String,
    pub data: Vec<TransactionResponse>,
    pub pagination: Option<PaginationMeta>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationTransactionDeleteAt {
    pub status: String,
    pub message: String,
    pub data: Vec<TransactionResponseDeleteAt>,
    pub pagination: Option<PaginationMeta>,
}
