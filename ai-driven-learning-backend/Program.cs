using Bl.Interfaces;
using Bl;
using Dal.Database;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddLogging();
builder.Services.AddSingleton<MongoDBContext>();
builder.Services.AddSingleton<MongoDBManager>();

builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));


BlManager.AddBlServices(builder.Services, builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

app.UseCors("AllowAll");
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
using (var scope = app.Services.CreateScope())
{
    BlManager.SeedDatabase(scope.ServiceProvider);
    Console.WriteLine("Data seeded successfully.");
}
app.Run();



