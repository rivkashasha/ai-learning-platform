using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dal.Interfaces;
using Models.Interfaces;

namespace Dal.Services
{
    public class CrudService<T> : ICrud<T> where T : class, IEntity
    {
        protected readonly IMongoCollection<T> _collection;

        public CrudService(IMongoDatabase database, string collectionName)
        {
            _collection = database.GetCollection<T>(collectionName);
        }

        public async Task<T?> GetByIdAsync(ObjectId id)
        {
            return await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<bool> AddAsync(T entity)
        {
            try
            {
                await _collection.InsertOneAsync(entity);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(ObjectId id, T entity)
        {
            var result = await _collection.ReplaceOneAsync(x => x.Id == id, entity);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(ObjectId id)
        {
            var result = await _collection.DeleteOneAsync(x => x.Id == id);
            return result.DeletedCount > 0;
        }
    }
}


