use serde::{Serialize, Deserialize};

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum Frequency {
    Fortnightly,
    Monthly
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MortgageCalcParams {
    pub loan_amount: f64,
    pub interest_rate: f64,
    pub years: u32,
    pub frequency: Frequency
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MortgageCalcResult<'a> {
    pub repayment_amount: f64,
    pub powered_by: &'a str
}
