using Bl.Interfaces;

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
    }
}
