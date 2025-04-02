using stockman.Models;
using stockman.Models.Dtos;

namespace stockman.Repositories.Interfaces
{
    public interface ICallRepository
    {
        Task<Call> CreateAsync(Call called);
        Task<IEnumerable<CallDto>> GetAllAsync();
        Task<Call> GetByIdAsync(long called);
        Task UpdateAsync(Call called);
        //Task DeleteAsync(Call called);
        Task<IEnumerable<CallDto>> GetByUserIdAsync(long userId);
        Task<IEnumerable<Call>> GetBySectorIdAsync(int sectorId);
        Task<IEnumerable<CallDto>> GetResolvedCalls();
    }
}
