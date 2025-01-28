use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct TopupResponse {
    pub id: i32,
    pub card_number: String,
    pub topup_no: String,
    pub topup_amount: i32,
    pub topup_method: String,
    pub topup_time: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct TopupResponseDeleteAt {
    pub id: i32,
    pub card_number: String,
    pub topup_no: String,
    pub topup_amount: i32,
    pub topup_method: String,
    pub topup_time: String,
    pub created_at: String,
    pub updated_at: String,
    pub deleted_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct TopupResponseMonthStatusSuccess {
    pub year: String,
    pub month: String,
    pub total_amount: i32,
    pub total_success: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TopupResponseYearStatusSuccess {
    pub year: String,
    pub total_amount: i32,
    pub total_success: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TopupResponseMonthStatusFailed {
    pub year: String,
    pub month: String,
    pub total_amount: i32,
    pub total_failed: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TopupResponseYearStatusFailed {
    pub year: String,
    pub total_amount: i32,
    pub total_failed: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TopupMonthMethodResponse {
    pub month: String,
    pub topup_method: String,
    pub total_topups: i32,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TopupYearlyMethodResponse {
    pub year: String,
    pub topup_method: String,
    pub total_topups: i32,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TopupMonthAmountResponse {
    pub month: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TopupYearlyAmountResponse {
    pub year: String,
    pub total_amount: i32,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTopupMonthStatusSuccess {
    pub status: String,
    pub message: String,
    pub data: Vec<TopupResponseMonthStatusSuccess>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTopupYearStatusSuccess {
    pub status: String,
    pub message: String,
    pub data: Vec<TopupResponseYearStatusSuccess>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTopupMonthStatusFailed {
    pub status: String,
    pub message: String,
    pub data: Vec<TopupResponseMonthStatusFailed>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTopupYearStatusFailed {
    pub status: String,
    pub message: String,
    pub data: Vec<TopupResponseYearStatusFailed>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTopupMonthMethod {
    pub status: String,
    pub message: String,
    pub data: Vec<TopupMonthMethodResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTopupYearMethod {
    pub status: String,
    pub message: String,
    pub data: Vec<TopupYearlyMethodResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTopupMonthAmount {
    pub status: String,
    pub message: String,
    pub data: Vec<TopupMonthAmountResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTopupYearAmount {
    pub status: String,
    pub message: String,
    pub data: Vec<TopupYearlyAmountResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTopup {
    pub status: String,
    pub message: String,
    pub data: Option<TopupResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsesTopup {
    pub status: String,
    pub message: String,
    pub data: Vec<TopupResponse>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationTopup {
    pub status: String,
    pub message: String,
    pub data: Vec<TopupResponse>,
    pub pagination: Option<PaginationMeta>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponsePaginationTopupDeleteAt {
    pub status: String,
    pub message: String,
    pub data: Vec<TopupResponseDeleteAt>,
    pub pagination: Option<PaginationMeta>,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTopupDelete {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct ApiResponseTopupAll {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct PaginationMeta {
    pub current_page: i32,
    pub total_pages: i32,
    pub total_items: i32,
}
