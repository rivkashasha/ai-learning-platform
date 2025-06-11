using Microsoft.Extensions.Configuration;
using Dal.Interfaces;
using Dal.Services;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Microsoft.Extensions.Options;


namespace Dal.Database
{
    public class DalManager : IDal
    {
        public IUser Users { get; }
        public ICategory Categories { get; }
        public ISubCategory SubCategories { get; }
        public IPrompt Prompts { get; }

        private readonly IMongoDatabase _database;

        public DalManager(MongoDBContext context)
        {
            _database = context.GetDatabase();
            //ServiceCollection services = new ServiceCollection();
            //ServiceProvider serviceProvider = services.BuildServiceProvider();

            Users = new UserService(_database);
            Categories = new CategoryService(_database);
            SubCategories = new SubCategoryService(_database);
            Prompts = new PromptService(_database);
        }
        public static IServiceCollection AddDalServices(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<MongoDBSettings>(options =>
                configuration.GetSection("MongoDBSettings")
            );
            services.AddSingleton<MongoDBContext>();
            services.AddSingleton<MongoDBManager>();
            services.AddSingleton<IMongoDatabase>(sp =>
            {
                var context = sp.GetRequiredService<MongoDBContext>();
                return context.GetDatabase();
            });
            services.AddScoped<IDal, DalManager>();
            return services;
        }

    }
}
