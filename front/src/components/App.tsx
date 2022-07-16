import { useState } from 'react';
import styled from 'styled-components';
import MortgageForm from './MortgageForm';
import ResultTable, { HostType, MortgageCalcTableResult } from './ResultTable';
import SpinningOverlay from './SpinningOverlay';
import type { MortgageCalcParams, MortgageCalcResult } from '../types';
import adapter from '../adapters/rust';

export default function App() {
  const [results, setResults] = useState<MortgageCalcTableResult[]>([]);
  const [isHandling, setIsHandling] = useState(false);

  return (
    <HighApp className="bg-dark">
      <RestrictedContainer className="container bg-white d-flex flex-column pt-3 pb-3 border">
        <h1 className="mb-3 text-center">Gavin's Mortgage Calculator</h1>
        <SpinningOverlay isSpinning={isHandling}>
          <MortgageForm onSubmit={handleSubmit} />

          {!!results.length && (
            <>
              <h3 className="mt-2">Results</h3>
              <ResultTable results={results} />
            </>
          )}
        </SpinningOverlay>
      </RestrictedContainer>
    </HighApp>
  );

  async function handleSubmit(values: MortgageCalcParams) {
    setIsHandling(true);
    setResults([]);

    const startMillis = performance.now();
    const pushResult = async (resultPromise: Promise<MortgageCalcResult>, hostType: HostType) => {
      const result = await resultPromise;
      const endMillis = performance.now();
      setResults((prev) => [
        ...prev,
        {
          ...result,
          runningIn: hostType,
          elapsedMillis: endMillis - startMillis
        }
      ]);
    };

    try {
      await Promise.all([
        pushResult(adapter.callMiddle(values), 'Front end'),
        pushResult(fetchMiddle(values), 'Back end')
      ]);
    } finally {
      setIsHandling(false);
    }
  }

  async function fetchMiddle(values: MortgageCalcParams): Promise<MortgageCalcResult> {
    const queryString = new URLSearchParams();
    for (const entry of Object.entries(values)) {
      queryString.set(entry[0], entry[1].toString());
    }
    const url = `http://localhost:4999/api/${adapter.backEndUrlSuffix}?${queryString}`;

    const response = await fetch(url);
    return (await response.json()) as MortgageCalcResult;
  }
}

const HighApp = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RestrictedContainer = styled.div`
  max-width: 720px;
`;
