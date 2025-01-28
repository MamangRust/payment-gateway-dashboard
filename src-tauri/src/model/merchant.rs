use serde::{Deserialize, Serialize};

use super::card::PaginationMeta;

#[derive(Serialize, Deserialize)]
pub struct MerchantResponse {
    pub id: i32,
    pub name: String,
    pub user_id: i32,
    pub api_key: String,
    pub status: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct MerchantResponseDeleteAt {
    pub id: i32,
    pub name: String,
    pub user_id: i32,
    pub api_key: String,
    pub status: String,
    pub created_at: String,
    pub updated_at: String,
    pub deleted_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct MerchantTransactionResponse {
    pub id: i32,
    pub card_number: String,
    pub amount: i32,
    pub payment_method: String,
    pub merchant_id: i32,
    pub merchant_name: String,
    pub transaction_time: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct MerchantResponseMonthlyPaymentMethod {
    pub month: String,
    pub payment_method: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct MerchantResponseYearlyPaymentMethod {
    pub year: String,
    pub payment_method: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct MerchantResponseMonthlyAmount {
    pub month: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct MerchantResponseYearlyAmount {
    pub year: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseMerchantMonthlyPaymentMethod {
    pub status: String,
    pub message: String,
    pub data: Vec<MerchantResponseMonthlyPaymentMethod>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseMerchantYearlyPaymentMethod {
    pub status: String,
    pub message: String,
    pub data: Vec<MerchantResponseYearlyPaymentMethod>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseMerchantMonthlyAmount {
    pub status: String,
    pub message: String,
    pub data: Vec<MerchantResponseMonthlyAmount>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseMerchantYearlyAmount {
    pub status: String,
    pub message: String,
    pub data: Vec<MerchantResponseYearlyAmount>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsesMerchant {
    pub status: String,
    pub message: String,
    pub data: Vec<MerchantResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseMerchant {
    pub status: String,
    pub message: String,
    pub data: MerchantResponse,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseMerchantDelete {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseMerchantAll {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationMerchant {
    pub status: String,
    pub message: String,
    pub data: Vec<MerchantResponse>,
    pub pagination: PaginationMeta,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationMerchantDeleteAt {
    pub status: String,
    pub message: String,
    pub data: Vec<MerchantResponseDeleteAt>,
    pub pagination: PaginationMeta,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationMerchantTransaction {
    pub status: String,
    pub message: String,
    pub data: Vec<MerchantTransactionResponse>,
    pub pagination: PaginationMeta,
}
