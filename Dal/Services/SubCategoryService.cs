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
    public class SubCategoryService : CrudService<SubCategory>, ISubCategory
    {
        public SubCategoryService(IMongoDatabase database)
            : base(database, "sub_categories")
        {
        }
    }
}
