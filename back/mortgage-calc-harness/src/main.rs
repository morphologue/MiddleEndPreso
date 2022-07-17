use std::ffi::{CStr, CString};
use mortgage_calc::{calc_repayment_c, calc_repayment_cfree};

/* Simulate the effect of P/Invoke by:
   1) copying json_params into a C string which Rust drops at the end of the call, and
   2) manually freeing the return value (not done by P/Invoke due to the IntPtr return type). 
 */
fn main() {
    // Paste your escaped input here.
    let json_params = "
{\"loanAmount\":1,\"interestRate\":2,\"years\":3,\"frequency\":\"fortnightly\"}
    ";
    let null_term = CString::new(json_params).unwrap();
    
    let needs_to_be_freed = calc_repayment_c(null_term.as_ptr());
    
    let borrowed_result = unsafe { CStr::from_ptr(needs_to_be_freed) };
    println!("{}", borrowed_result.to_str().unwrap());
    unsafe { calc_repayment_cfree(needs_to_be_freed); }
}
