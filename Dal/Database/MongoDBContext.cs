using Microsoft.Extensions.Options;
using MongoDB.Driver;



namespace Dal.Database
{
    public class MongoDBContext
    {
        private readonly IMongoDatabase _database;

        public MongoDBContext(IOptions<MongoDBSettings> settings)
        {
            try
            {

                var client = new MongoClient(settings.Value.ConnectionString);
                _database = client.GetDatabase(settings.Value.DatabaseName);
            }
            catch (Exception ex)
            {
                // Log the error and rethrow for visibility
                Console.WriteLine($"Failed to connect to MongoDB: {ex.Message}");
                throw;
            }
        }

        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            try
            {
                return _database.GetCollection<T>(collectionName);
            }
            catch (Exception ex)
            {
                // Log the error and rethrow for visibility
                Console.WriteLine($"Failed to get collection {collectionName}: {ex.Message}");
                throw;
            }
        }
        public IMongoDatabase GetDatabase()
        {
            return _database;
        }
    }
}
