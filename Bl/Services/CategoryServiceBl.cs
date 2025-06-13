using Bl.Interfaces;
using Dal.Interfaces;
using Microsoft.Extensions.Logging;
using Models.Classes;
using MongoDB.Bson;

namespace Bl
{
    public class CategoryServiceBl : ICategoryBl
    {
        private readonly IDal _dal;
        private readonly ILogger<CategoryServiceBl> _logger;

        public CategoryServiceBl(IDal dal, ILogger<CategoryServiceBl> logger)
        {
            _dal = dal;
            _logger = logger;
        }

        public async Task<List<Category>> GetAllCategoriesAsync()
        {
            try
            {
                return await _dal.Categories.GetAllAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetAllCategoriesAsync error: {Message}", ex.Message);
                return new List<Category>();
            }
        }

        public async Task<List<SubCategory>> GetSubCategoriesForCategoryAsync(string categoryId)
        {
            try
            {
                if (!ObjectId.TryParse(categoryId, out var objectId))
                    return new List<SubCategory>();
                var allSubCategories = await _dal.SubCategories.GetAllAsync();
                return allSubCategories.FindAll(sc => sc.CategoryId == objectId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetSubCategoriesForCategoryAsync error: {Message}", ex.Message);
                return new List<SubCategory>();
            }
        }
    }
}


