using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Morphologue.MiddleEndPreso.Adapters;
using Morphologue.MiddleEndPreso.Models;

namespace Morphologue.MiddleEndPreso;

[Route("/api")]
public class ApiController : ControllerBase
{
    private readonly IAdapter _rust;

    public ApiController()
    {
        _rust = new RustAdapter();
    }

    [HttpGet("rust")]
    public MortgageCalcResult GetRust([Required] [FromQuery] MortgageCalcParams calcParams)
        => _rust.CalcRepayment(calcParams);
}
