using Morphologue.MiddleEndPreso.Models;

namespace Morphologue.MiddleEndPreso;

internal interface IAdapter
{
    MortgageCalcResult CalcRepayment(MortgageCalcParams calcParams);
}
