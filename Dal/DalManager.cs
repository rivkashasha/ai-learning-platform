using Dal.Interfaces;
using Dal.Services;
using Models.Classes;
using MongoDB.Driver;

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

            Users = new UserService(_database);
            Categories = new CategoryService(_database);
            SubCategories = new SubCategoryService(_database);
            Prompts = new PromptService(_database);
        }
    }
}
