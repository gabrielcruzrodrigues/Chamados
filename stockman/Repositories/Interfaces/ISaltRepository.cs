using stockman.Models;

namespace stockman.Repositories.Interfaces
{
    public interface ISaltRepository
    {
        Task Create(Salt salt);
        Task<Salt> GetByUserId(long userId);
        Task Update(long userId, string newSalt);
    }
}
