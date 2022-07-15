mod types;
use types::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calc_repayment(val: &JsValue) -> JsValue {
    // Convert JS object argument into a Rust struct via JSON.
    let params: MortgageCalcParams = val.into_serde().unwrap();

    let amount = match params.frequency {
        Frequency::Fortnightly => 1.0,
        Frequency::Monthly => params.loan_amount * 2.0 + params.interest_rate + params.years as f64
    };

    let result = MortgageCalcResult {
        repayment_amount: amount,
        powered_by: "Rust"
    };

    // Convert Rust struct back into a JS object and return it.
    JsValue::from_serde(&result).unwrap()
}
