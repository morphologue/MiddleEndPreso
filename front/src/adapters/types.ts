import type { MortgageCalcParams, MortgageCalcResult } from '../types';

export type Adapter = {
  callMiddle: (values: MortgageCalcParams) => Promise<MortgageCalcResult>;
  backEndUrlSuffix: string;
};
