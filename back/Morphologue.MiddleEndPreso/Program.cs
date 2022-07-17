using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddCors()
    .AddMvc()
    .AddJsonOptions(opt =>
    {
        var innerOpt = opt.JsonSerializerOptions;
        innerOpt.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase, false));
        innerOpt.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

var app = builder.Build();
app.UseCors(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseRouting();
app.UseEndpoints(b => b.MapControllers());

app.Run();
