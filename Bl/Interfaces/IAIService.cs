using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Interfaces
{
    public interface IAIService
    {
      Task<string> GenerateLessonAsync(string categoryName, string subCategoryName, string promptText);       
    }
}
