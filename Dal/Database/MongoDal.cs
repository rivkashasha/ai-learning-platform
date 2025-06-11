using Dal.Interfaces;

namespace Dal.Database
{
    public class MongoDal : IDal
    {
        public IUser Users { get; }
        public ICategory Categories { get; }
        public ISubCategory SubCategories { get; }
        public IPrompt Prompts { get; }

        public MongoDal(IUser users, ICategory categories, ISubCategory subCategories, IPrompt prompts)
        {
            Users = users;
            Categories = categories;
            SubCategories = subCategories;
            Prompts = prompts;
        }
    }

}
