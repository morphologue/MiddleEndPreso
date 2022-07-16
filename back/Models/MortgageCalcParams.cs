namespace Morphologue.MiddleEndPreso.Models;

public class MortgageCalcParams
{
    public double LoanAmount { get; init; }

    public double InterestRate { get; init; }

    public double Years { get; init; }

    public Frequency Frequency { get; init; }
}

public enum Frequency
{
    Fortnightly,
    Monthly
}
