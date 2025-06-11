
////builder.Services.Configure<OpenAIOptions>(builder.Configuration.GetSection("OpenAI"));


////builder.Services.AddScoped<IUser, UserService>();
////builder.Services.AddScoped<ICategory, CategoryService>();
////builder.Services.AddScoped<ISubCategory, SubCategoryService>();
////builder.Services.AddScoped<IPrompt, PromptService>();

////builder.Services.AddScoped<IDal, MongoDal>();

//// Add Swagger/OpenAPI
////builder.Services.AddSwaggerGen(options =>
////{
////    options.SwaggerDoc("v1", new OpenApiInfo
////    {
////        Title = "AI-Driven Learning Platform API",
////        Version = "v1",
////        Description = "API for the AI-Driven Learning Platform"
////    });
////    // If you want to include XML comments, add:
////    // var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
////    // options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
////});

////app.UseSwaggerUI(options =>
////{
////    options.SwaggerEndpoint("/swagger/v1/swagger.json", "AI-Driven Learning Platform API v1");
////    options.RoutePrefix = string.Empty; // Swagger at root
////});

//app.UseHttpsRedirection();
////app.UseAuthorization();
//app.MapControllers();


using Bl.Interfaces;
using Bl;
using Dal.Database;
using Dal.Interfaces;
using Dal.Services;
using Models.Classes;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddLogging();
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));

// Register MongoDBContext and DatabaseManager with dependency injection
builder.Services.AddSingleton<MongoDBContext>();
builder.Services.AddSingleton<MongoDBManager>();
builder.Services.AddSingleton<IMongoDatabase>(sp =>
{
    var context = sp.GetRequiredService<MongoDBContext>();
    return context.GetDatabase();
});

builder.Services.AddBlServices();
builder.Services.AddScoped<ICategoryBl, CategoryServiceBl>();
builder.Services.AddScoped<IUserBl, UserServiceBl>();
//builder.Services.AddScoped<IPromptBl, PromptServiceBl>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
//using (var scope = app.Services.CreateScope())
//{
//    var dbManager = scope.ServiceProvider.GetRequiredService<MongoDBManager>();
//    var database = dbManager.GetDatabase(); // this needs to exist in your MongoDBManager
//    SeedData.SeedDatabase(database); // this runs the seed logic
//    Console.WriteLine(" Petiphores seeded successfully.");

//}
Console.WriteLine("ghjkjgh");
app.MapGet("/", () => "Hello World!");

app.MapGet("/test", (MongoDBManager dbManager) =>
{
    var usersCollection = dbManager.GetCollection<User>("users");
    if (usersCollection != null)
    {
        Console.WriteLine("Successfully connected to Users collection!");
        return "Successfully connected to Users collection!";
    }
    Console.WriteLine("test failed");
    return "test failed";
});
app.Run();



