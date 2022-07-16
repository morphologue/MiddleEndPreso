using System.Runtime.InteropServices;
using System.Text.Json;
using System.Text.Json.Serialization;
using Morphologue.MiddleEndPreso.Models;

namespace Morphologue.MiddleEndPreso.Adapters;

internal class RustAdapter : IAdapter
{
    private static readonly JsonSerializerOptions SerializerOptions = new()
    {
        Converters = {new JsonStringEnumConverter(JsonNamingPolicy.CamelCase, false)},
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public MortgageCalcResult CalcRepayment(MortgageCalcParams calcParams)
    {
        var jsonParams = JsonSerializer.Serialize(calcParams, SerializerOptions);

        string jsonResult;
        var mustBeFreed = calc_repayment_c(jsonParams);
        try
        {
            jsonResult = Marshal.PtrToStringAnsi(mustBeFreed)
                         ?? throw new ApplicationException("The return JSON cannot be marshalled");
        }
        finally
        {
            calc_repayment_cfree(mustBeFreed);
        }

        return JsonSerializer.Deserialize<MortgageCalcResult>(jsonResult, SerializerOptions)
               ?? throw new ApplicationException("Rust may not return the string 'null'");
    }

    // The IntPtr return type prevents P/Invoke from freeing the string which was allocated by Rust, which would
    // corrupt Rust memory. Instead we pass the pointer back to calc_repayment_cfree() to free it.
    [DllImport("libmortgage_calc.dylib", CharSet = CharSet.Ansi)]
    private static extern IntPtr calc_repayment_c(string jsonParams);

    [DllImport("libmortgage_calc.dylib")]
    private static extern void calc_repayment_cfree(IntPtr rawResult);
}
