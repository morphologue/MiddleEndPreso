import { useState } from "react";
import styled from "styled-components";
import MortgageForm from "./MortgageForm";
import ResultTable, { MortgageCalcTableResult } from "./ResultTable";
import SpinningOverlay from "./SpinningOverlay";
import type { MortgageCalcParams } from "./types";

export default function App() {
  const [results, setResults] = useState<MortgageCalcTableResult[]>([]);
  const [isHandling, setIsHandling] = useState(false);

  async function handleSubmit(values: MortgageCalcParams) {
    setIsHandling(true);
    setResults([]);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setResults([
        {
          repaymentAmount: 69,
          poweredBy: "Dummy",
          runningIn: "Front end",
          elapsedSeconds: 0.1,
        },
      ]);
    } finally {
      setIsHandling(false);
    }
  }

  return (
    <HighApp className="bg-dark">
      <div className="container-sm bg-white d-flex flex-column pt-3 pb-3 border">
        <h1 className="mb-3 text-center">
          Gavin's Overengineered Mortgage Calculator
        </h1>
        <MortgageForm onSubmit={handleSubmit} />

        <SpinningOverlay isSpinning={isHandling}>
          <h3 className="mt-2">Results</h3>
          {!!results.length && <ResultTable results={results} />}
        </SpinningOverlay>
      </div>
    </HighApp>
  );
}

const HighApp = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
