import type { MortgageCalcParams, MortgageCalcResult } from '../types';
import type { Adapter } from './types';
import init, { calc_repayment_js } from 'middle/rust/pkg/mortgage_calc';

const wasmInitPromise = init();

async function callMiddle(values: MortgageCalcParams) {
  await wasmInitPromise;
  return calc_repayment_js(values) as MortgageCalcResult;
}

export default {
  callMiddle,
  backEndUrlSuffix: 'rust'
} as Adapter;
