export type MortgageCalcParams = {
  loanAmount: number;
  interestRate: number;
  years: number;
  frequency: 'fortnightly' | 'monthly';
};

export type MortgageCalcResult = {
  repaymentAmount: number;
  poweredBy: string;
};
