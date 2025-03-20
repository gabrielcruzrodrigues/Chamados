using stockman.Models;
using stockman.Models.Dtos;

namespace stockman.Repositories.Interfaces
{
    public interface IUsersRepository
    {
        Task<UserDto> CreateAsync(Users user);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetByIdAsync(long userId);
        Task<Users> GetByEmailAsync(string email);
        Task<Users> GetByNameAsync(string name);
        Task<Users> GetByIdWithTrackingAsync(long userId);
        Task Update(Users userForUpdate);
        Task Disable(long userId);
    }
}
