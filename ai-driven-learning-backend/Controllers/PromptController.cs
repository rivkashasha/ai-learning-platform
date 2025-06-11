using Microsoft.AspNetCore.Mvc;
using Bl.Interfaces;
using Models.Classes;
namespace AIDrivenLearningService.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class PromptController : ControllerBase
    {
        private readonly IPromptBl _promptBl;

        public PromptController(IPromptBl promptBl)
        {
            _promptBl = promptBl;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitPrompt([FromBody] PromptRequestDto dto)
        {
            var prompt = await _promptBl.SubmitPromptAndGetLessonAsync(dto.CustomId, dto.CategoryId, dto.SubCategoryId, dto.PromptText);
            if (prompt == null)
                return BadRequest("Invalid data or failed to generate lesson.");
            return Ok(prompt);
        }


        [HttpGet("user/{customId}")]
        public async Task<IActionResult> GetUserHistory(string customId)
        {
            var history = await _promptBl.GetUserLearningHistoryAsync(customId);
            return Ok(history);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var prompts = await _promptBl.GetAllPromptsAsync();
            return Ok(prompts);
        }
    }

    // DTO for prompt submission
    public class PromptRequestDto
    {
        public string CustomId { get; set; }
        public string CategoryId { get; set; }
        public string SubCategoryId { get; set; }
        public string PromptText { get; set; }
    }

}
