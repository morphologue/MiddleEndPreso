mod types;
mod logic;

use types::*;
use logic::calc_repayment;
use wasm_bindgen::prelude::*;
use std::ffi::{CString, CStr};
use std::os::raw::c_char;

#[wasm_bindgen]
pub fn calc_repayment_js(val: &JsValue) -> JsValue {
    let params: MortgageCalcParams = val.into_serde().unwrap();
    let result = calc_repayment(params);
    JsValue::from_serde(&result).unwrap()
}

#[no_mangle]
pub extern "C" fn calc_repayment_c(val: *const c_char) -> *mut c_char {
    let rusty_val = unsafe { CStr::from_ptr(val) }.to_str().unwrap();
    let params: MortgageCalcParams = serde_json::from_str(&rusty_val).unwrap();
    
    let result = calc_repayment(params);
    
    let result_json = serde_json::to_string(&result).unwrap();
    CString::new(result_json).unwrap().into_raw()
}

#[no_mangle]
pub unsafe extern "C" fn calc_repayment_cfree(ptr: *mut c_char) {
    drop(CString::from_raw(ptr));
}
