using System.Threading.Tasks;

namespace Bl.Interfaces
{
    public interface IBl
    {
        ICategoryBl CategoryBl { get; }
        IUserBl UserBl { get; }
        IPromptBl PromptBl { get; }
    }
}
