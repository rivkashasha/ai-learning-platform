using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Interfaces;
using Models.Classes;
using MongoDB.Driver;

namespace Dal.Services
{
    public class UserService : CrudService<User>, IUser
    {
        public UserService(IMongoDatabase database)
            : base(database, "users")
        {
        }
    }
}
