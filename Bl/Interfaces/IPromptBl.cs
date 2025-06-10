using Models.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Interfaces
{
    public interface IPromptBl
    {
        Task<Prompt> SubmitPromptAndGetLessonAsync(string userId, string categoryId, string subCategoryId, string promptText);
        Task<List<Prompt>> GetUserLearningHistoryAsync(string userId);
        Task<List<Prompt>> GetAllPromptsAsync();
    }
}
