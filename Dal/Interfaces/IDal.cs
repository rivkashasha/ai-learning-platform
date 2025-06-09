using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Interfaces
{
    public interface IDal
    {
        IUser Users { get; }
        ICategory Categories { get; }
        ISubCategory SubCategories { get; }
        IPrompt Prompts { get; }
    }
}
