import type { MortgageCalcResult } from '../types';

export type HostType = 'Front end' | 'Back end';

export type MortgageCalcTableResult = MortgageCalcResult & {
  runningIn: HostType;
  elapsedMillis: number;
};

export default function ResultTable({ results }: { results: MortgageCalcTableResult[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Repayment amount</th>
          <th scope="col">Powered by</th>
          <th scope="col">Running in</th>
          <th scope="col">Elapsed ms</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r) => (
          <tr key={r.poweredBy + r.runningIn}>
            <td>{r.repaymentAmount}</td>
            <td>{r.poweredBy}</td>
            <td>{r.runningIn}</td>
            <td>{r.elapsedMillis}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
