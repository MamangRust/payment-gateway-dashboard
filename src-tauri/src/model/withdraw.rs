use serde::{Deserialize, Serialize};

use super::card::PaginationMeta;

#[derive(Serialize, Deserialize)]
pub struct WithdrawResponse {
    pub id: i32,
    pub withdraw_no: String,
    pub card_number: String,
    pub withdraw_amount: i32,
    pub withdraw_time: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct WithdrawResponseDeleteAt {
    pub id: i32,
    pub withdraw_no: String,
    pub card_number: String,
    pub withdraw_amount: i32,
    pub withdraw_time: String,
    pub created_at: String,
    pub updated_at: String,
    pub deleted_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct WithdrawResponseMonthStatusSuccess {
    pub year: String,
    pub month: String,
    pub total_amount: i32,
    pub total_success: i32,
}

#[derive(Serialize, Deserialize)]
pub struct WithdrawResponseYearStatusSuccess {
    pub year: String,
    pub total_amount: i32,
    pub total_success: i32,
}

#[derive(Serialize, Deserialize)]
pub struct WithdrawResponseMonthStatusFailed {
    pub year: String,
    pub total_amount: i32,
    pub month: String,
    pub total_failed: i32,
}

#[derive(Serialize, Deserialize)]
pub struct WithdrawResponseYearStatusFailed {
    pub year: String,
    pub total_amount: i32,
    pub total_failed: i32,
}

#[derive(Serialize, Deserialize)]
pub struct WithdrawMonthlyAmountResponse {
    pub month: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct WithdrawYearlyAmountResponse {
    pub year: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseWithdrawMonthStatusSuccess {
    pub status: String,
    pub message: String,
    pub data: Vec<WithdrawResponseMonthStatusSuccess>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseWithdrawYearStatusSuccess {
    pub status: String,
    pub message: String,
    pub data: Vec<WithdrawResponseYearStatusSuccess>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseWithdrawMonthStatusFailed {
    pub status: String,
    pub message: String,
    pub data: Vec<WithdrawResponseMonthStatusFailed>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseWithdrawYearStatusFailed {
    pub status: String,
    pub message: String,
    pub data: Vec<WithdrawResponseYearStatusFailed>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseWithdrawMonthAmount {
    pub status: String,
    pub message: String,
    pub data: Vec<WithdrawMonthlyAmountResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseWithdrawYearAmount {
    pub status: String,
    pub message: String,
    pub data: Vec<WithdrawYearlyAmountResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsesWithdraw {
    pub status: String,
    pub message: String,
    pub data: Vec<WithdrawResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseWithdraw {
    pub status: String,
    pub message: String,
    pub data: Option<WithdrawResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseWithdrawDelete {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseWithdrawAll {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationWithdraw {
    pub status: String,
    pub message: String,
    pub data: Vec<WithdrawResponse>,
    pub pagination: PaginationMeta,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationWithdrawDeleteAt {
    pub status: String,
    pub message: String,
    pub data: Vec<WithdrawResponseDeleteAt>,
    pub pagination: PaginationMeta,
}
