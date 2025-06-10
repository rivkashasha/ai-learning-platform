using Models.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Interfaces
{
    public interface IUserBl
    {
        Task<User?> RegisterUserAsync(string name, string phone);
        Task<User?> GetUserByIdAsync(string userId);
        Task<List<User>> GetAllUsersAsync();
    }
}
