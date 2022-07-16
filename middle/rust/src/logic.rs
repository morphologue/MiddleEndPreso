use crate::*;

pub fn calc_repayment(params: &MortgageCalcParams) -> MortgageCalcResult {
    let amount = match params.frequency {
        Frequency::Fortnightly => 1.0,
        Frequency::Monthly => params.loan_amount * 2.0 + params.interest_rate + params.years as f64
    };

    MortgageCalcResult {
        repayment_amount: amount,
        powered_by: "Rust"
    }
}
