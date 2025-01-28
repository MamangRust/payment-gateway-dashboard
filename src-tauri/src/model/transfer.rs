use serde::{Deserialize, Serialize};

use super::card::PaginationMeta;

#[derive(Serialize, Deserialize)]
pub struct TransferResponse {
    pub id: i32,
    pub transfer_no: String,
    pub transfer_from: String,
    pub transfer_to: String,
    pub transfer_amount: i32,
    pub transfer_time: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct TransferResponseDeleteAt {
    pub id: i32,
    pub transfer_no: String,
    pub transfer_from: String,
    pub transfer_to: String,
    pub transfer_amount: i32,
    pub transfer_time: String,
    pub created_at: String,
    pub updated_at: String,
    pub deleted_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct TransferResponseMonthStatusSuccess {
    pub year: String,
    pub month: String,
    pub total_amount: i32,
    pub total_success: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransferResponseYearStatusSuccess {
    pub year: String,
    pub total_amount: i32,
    pub total_success: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransferResponseMonthStatusFailed {
    pub year: String,
    pub month: String,
    pub total_amount: i32,
    pub total_failed: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransferResponseYearStatusFailed {
    pub year: String,
    pub total_amount: i32,
    pub total_failed: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransferMonthAmountResponse {
    pub month: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TransferYearAmountResponse {
    pub year: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransferMonthStatusSuccess {
    pub status: String,
    pub message: String,
    pub data: Vec<TransferResponseMonthStatusSuccess>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransferYearStatusSuccess {
    pub status: String,
    pub message: String,
    pub data: Vec<TransferResponseYearStatusSuccess>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransferMonthStatusFailed {
    pub status: String,
    pub message: String,
    pub data: Vec<TransferResponseMonthStatusFailed>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransferYearStatusFailed {
    pub status: String,
    pub message: String,
    pub data: Vec<TransferResponseYearStatusFailed>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransferMonthAmount {
    pub status: String,
    pub message: String,
    pub data: Vec<TransferMonthAmountResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransferYearAmount {
    pub status: String,
    pub message: String,
    pub data: Vec<TransferYearAmountResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransfer {
    pub status: String,
    pub message: String,
    pub data: Option<TransferResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransfers {
    pub status: String,
    pub message: String,
    pub data: Vec<TransferResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransferDelete {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTransferAll {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationTransfer {
    pub status: String,
    pub message: String,
    pub data: Vec<TransferResponse>,
    pub pagination: Option<PaginationMeta>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationTransferDeleteAt {
    pub status: String,
    pub message: String,
    pub data: Vec<TransferResponseDeleteAt>,
    pub pagination: Option<PaginationMeta>,
}
