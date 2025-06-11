using Models.Classes;

namespace Bl.Interfaces
{
    public interface IPromptBl
    {
        Task<Prompt> SubmitPromptAndGetLessonAsync(string customId, string categoryName, string subCategoryName, string promptText);
        Task<List<Prompt>> GetUserLearningHistoryAsync(string customId);
        Task<List<Prompt>> GetAllPromptsAsync();
    }
}
