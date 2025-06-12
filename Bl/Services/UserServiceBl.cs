using Bl.Interfaces;
using Dal.Interfaces;
using Models.Classes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bl
{
    public class UserServiceBl : IUserBl
    {
        private readonly IDal _dal;

        public UserServiceBl(IDal dal)
        {
            _dal = dal;
        }

        public async Task<User?> RegisterUserAsync(string? customId, string name, string phone)
        {
            try
            {
                var users = await _dal.Users.GetAllAsync();
                if (users.Exists(u => u.Phone == phone))
                    return null;

                var user = new User {
                    Id = MongoDB.Bson.ObjectId.GenerateNewId(),
                    CustomId = customId,
                    Name = name,
                    Phone = phone };
                var success = await _dal.Users.AddAsync(user);
                return success ? user : null;
            }
            catch (Exception ex)
            {
                // Log exception as needed
                Console.WriteLine($"RegisterUserAsync error: {ex.Message}");
                return null;
            }
        }

        public async Task<User?> GetUserByPhoneAsync(string phone)
        {
            try
            {
                var users = await _dal.Users.GetAllAsync();
                return users.Find(u => u.Phone == phone);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"GetUserByPhoneAsync error: {ex.Message}");
                return null;
            }
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            try
            {
                return await _dal.Users.GetAllAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"GetAllUsersAsync error: {ex.Message}");
                return new List<User>();
            }
        }

        public async Task<User?> GetUserByIdAsync(string customId)
        {
            try
            {
                var users = await _dal.Users.GetAllAsync();
                return users.Find(u => u.CustomId == customId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"GetUserByIdAsync error: {ex.Message}");
                return null;
            }
        }
    }
}
