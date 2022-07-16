using Morphologue.MiddleEndPreso.Models;

namespace Morphologue.MiddleEndPreso.Adapters;

internal interface IAdapter
{
    MortgageCalcResult CalcRepayment(MortgageCalcParams calcParams);
}
