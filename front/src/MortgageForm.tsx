import { Field, Form } from "react-final-form";
import type { MortgageCalcParams } from "./types";

type MortgageCalcStrings = {
  [key in keyof MortgageCalcParams]: MortgageCalcParams[key] extends number
    ? string | undefined
    : MortgageCalcParams[key];
};

export default function MortgageForm({
  onSubmit,
}: {
  onSubmit: (values: MortgageCalcParams) => void;
}) {
  return (
    <Form<MortgageCalcStrings>
      onSubmit={(values) =>
        onSubmit({
          loanAmount: Number(values.loanAmount),
          interestRate: Number(values.interestRate),
          years: Number(values.years),
          frequency: values.frequency,
        })
      }
      initialValues={{
        frequency: "fortnightly",
      }}
      render={({ handleSubmit, valid, submitting }) => (
        <form
          onSubmit={handleSubmit}
        >
          <NumericInputField name="loanAmount" label="Loan amount" />
          <NumericInputField name="interestRate" label="Interest rate (%)" />
          <NumericInputField name="years" label="Term (years)" />
          <div className="d-flex mb-4 pb-1">
            <RadioField
              name="frequency"
              label="Fortnightly"
              value="fortnightly"
            />
            <RadioField name="frequency" label="Monthly" value="monthly" />
          </div>
          <button
            type="submit"
            className="mb-4 btn btn-primary"
            disabled={!valid || submitting}
          >
            Calculate
          </button>
        </form>
      )}
    ></Form>
  );
}

const NumericInputField = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => (
  <Field
    name={name}
    type="number"
    validate={(value) => (isNaN(value) ? "Required" : undefined)}
  >
    {({ input, meta }) => (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input {...input} className="form-control" placeholder="0" />
        {meta.error && meta.touched && (
          <small className="text-danger">{meta.error}</small>
        )}
      </div>
    )}
  </Field>
);

const RadioField = ({
  name,
  label,
  value,
}: {
  name: string;
  label: string;
  value: string;
}) => (
  <Field name={name} value={value} type="radio">
    {({ input }) => (
      <div className="me-3 form-check">
        <input {...input} className="form-check-input" />
        <label className="form-check-label">{label}</label>
      </div>
    )}
  </Field>
);
