using Bl.Interfaces;
using Dal.Database;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Bl
{
    public class BlManager : IBl
    {
        public ICategoryBl CategoryBl { get; }
        public IUserBl UserBl { get; }
        public IPromptBl PromptBl { get; }

        public BlManager(ICategoryBl categoryBl, IUserBl userBl, IPromptBl promptBl)
        {
            CategoryBl = categoryBl;
            UserBl = userBl;
            PromptBl = promptBl;
        }
        public static IServiceCollection AddBlServices(IServiceCollection services, IConfiguration configuration)
        {
            DalManager.AddDalServices(services, configuration);

            services.AddScoped<ICategoryBl, CategoryServiceBl>();
            services.AddScoped<IUserBl, UserServiceBl>();
            services.AddScoped<IPromptBl, PromptServiceBl>();
            services.AddHttpClient<IAIService, OpenAIService>(); 

            services.AddScoped<IBl, BlManager>();

            return services;
        }
        public static void SeedDatabase(IServiceProvider serviceProvider)
        {
            var dbManager = serviceProvider.GetRequiredService<MongoDBManager>();
            var database = dbManager.GetDatabase();
            SeedData.SeedDatabase(database);
        }
    }
}
