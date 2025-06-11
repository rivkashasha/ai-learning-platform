using Microsoft.Extensions.DependencyInjection;
using Bl.Interfaces;
using Bl;
using Dal.Interfaces;
using Dal.Database;
using Dal.Services;

namespace Bl
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBlServices(this IServiceCollection services)
        {
            // Register BL services

            // Register DAL services
            services.AddScoped<IDal, MongoDal>();
            services.AddScoped<IUser, UserService>();
            services.AddScoped<ICategory, CategoryService>();
            services.AddScoped<ISubCategory, SubCategoryService>();
            services.AddScoped<IPrompt, PromptService>();

            return services;
        }
    }
}

