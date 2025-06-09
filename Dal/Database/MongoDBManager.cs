using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Database
{
    public class MongoDBManager
    {
        private readonly MongoDBContext _context;

        // Accept MongoDBContext as a dependency through the constructor
        public MongoDBManager(MongoDBContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context), "MongoDBContext cannot be null"); ;
        }
        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(collectionName))
                {
                    throw new ArgumentException("Collection name cannot be null or empty", nameof(collectionName));
                }

                return _context.GetCollection<T>(collectionName);
            }
            catch (MongoException mongoEx)
            {
                // Log the MongoDB-specific error
                Console.WriteLine($"MongoDB error while getting collection '{collectionName}': {mongoEx.Message}");
                throw; // Re-throw the exception after logging
            }
            catch (Exception ex)
            {
                // Log any other error
                Console.WriteLine($"An error occurred while getting collection '{collectionName}': {ex.Message}");
                throw; // Re-throw the exception after logging
            }
        }
        public IMongoDatabase GetDatabase()
        {
            return _context.GetDatabase();
        }
    }
}
