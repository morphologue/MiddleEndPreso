use crate::*;

pub fn calc_repayment(params: &MortgageCalcParams) -> MortgageCalcResult {
    // Calculate the effective interest rate over the period.
    let daily_factor = 1.0 + params.interest_rate / 36500.0;
    let effective_rate = match params.frequency {
        Frequency::Fortnightly => daily_factor.powi(14),
        Frequency::Monthly => daily_factor.powf(365.0 / 12.0)
    } - 1.0;

    let num_periods = (params.years as f64) * match params.frequency {
        Frequency::Fortnightly => 26.0,
        Frequency::Monthly => 12.0
    };

    // https://en.wikipedia.org/wiki/Mortgage_calculator
    let repayment_amount = (effective_rate * params.loan_amount)
        / (1.0 - (1.0 + effective_rate).powf(num_periods * -1.0));

    MortgageCalcResult {
        repayment_amount,
        powered_by: "Rust"
    }
}
