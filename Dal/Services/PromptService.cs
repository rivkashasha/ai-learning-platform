using Dal.Interfaces;
using Models.Classes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class PromptService : CrudService<Prompt>, IPrompt
    {
        public PromptService(IMongoDatabase database)
            : base(database, "prompts")
        {
        }
    }
}
