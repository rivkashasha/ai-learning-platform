using Bl.Interfaces;
using Dal.Interfaces;
using Microsoft.Extensions.Logging;
using Models.Classes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bl
{
    public class PromptServiceBl : IPromptBl
    {
        private readonly IDal _dal;
        private readonly IAIService _aiService;
        private readonly ILogger<PromptServiceBl> _logger;

        public PromptServiceBl(IDal dal, IAIService aiService, ILogger<PromptServiceBl> logger)
        {
            _dal = dal;
            _aiService = aiService;
            _logger = logger;
        }

        public async Task<Prompt> SubmitPromptAndGetLessonAsync(string userId, string categoryId, string subCategoryId, string promptText)
        {
            try
            {
                if (!ObjectId.TryParse(userId, out var userObjId) ||
                    !ObjectId.TryParse(categoryId, out var catObjId) ||
                    !ObjectId.TryParse(subCategoryId, out var subCatObjId))
                    return null;

                var aiResponse = await _aiService.GenerateLessonAsync(promptText);

                var prompt = new Prompt
                {
                    UserId = userObjId,
                    CategoryId = catObjId,
                    SubCategoryId = subCatObjId,
                    PromptText = promptText,
                    Response = aiResponse,
                    CreatedAt = DateTime.UtcNow
                };
                await _dal.Prompts.AddAsync(prompt);
                return prompt;
            }
            catch (Exception ex)
            {
                _logger.LogError($"SubmitPromptAndGetLessonAsync error: {ex.Message}");
                return null;
            }
        }

        public async Task<List<Prompt>> GetUserLearningHistoryAsync(string userId)
        {
            try
            {
                if (!ObjectId.TryParse(userId, out var userObjId))
                    return new List<Prompt>();
                var allPrompts = await _dal.Prompts.GetAllAsync();
                return allPrompts.FindAll(p => p.UserId == userObjId);
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetUserLearningHistoryAsync error: {ex.Message}");
                return new List<Prompt>();
            }
        }

        public async Task<List<Prompt>> GetAllPromptsAsync()
        {
            try
            {
                return await _dal.Prompts.GetAllAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetAllPromptsAsync error: {ex.Message}");
                return new List<Prompt>();
            }
        }
    }
}

