using Models.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Interfaces
{
    public interface ICategoryBl
    {
        Task<List<Category>> GetAllCategoriesAsync();
        Task<List<SubCategory>> GetSubCategoriesForCategoryAsync(string categoryId);
    }
}
