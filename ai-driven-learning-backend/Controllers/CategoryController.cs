using Microsoft.AspNetCore.Mvc;
using Bl.Interfaces;
using System.Linq;

namespace AIDrivenLearningService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryBl _categoryBl;

        public CategoryController(ICategoryBl categoryBl)
        {
            _categoryBl = categoryBl;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var categories = await _categoryBl.GetAllCategoriesAsync();
                var result = categories.Select(c => new
                {
                    id = c.Id.ToString(),
                    name = c.Name
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving categories.", detail = ex.Message });
            }
        }

        [HttpGet("{categoryId}/subcategories")]
        public async Task<IActionResult> GetSubCategories(string categoryId)
        {
            var subCategories = await _categoryBl.GetSubCategoriesForCategoryAsync(categoryId);
            var result = subCategories.Select(sc => new
            {
                id = sc.Id.ToString(),
                name = sc.Name,
                category_id = sc.CategoryId.ToString()
            });
            return Ok(result);
        }
    }
}
