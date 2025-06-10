using Bl.Interfaces;
using Bl.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddLogging();
builder.Services.Configure<OpenAIOptions>(builder.Configuration.GetSection("OpenAI"));
builder.Services.AddHttpClient<IAIService, OpenAIService>();

var app = builder.Build();
app.MapGet("/", () => "Hello World!");

app.Run();
