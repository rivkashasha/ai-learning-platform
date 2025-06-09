using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dal.Interfaces
{
    public interface ICrud<T>
    {
        Task<T?> GetByIdAsync(ObjectId id);
        Task<List<T>> GetAllAsync();
        Task <bool> AddAsync(T entity);
        Task <bool> UpdateAsync(ObjectId id, T entity);
        Task <bool> DeleteAsync(ObjectId id);
    }
}
