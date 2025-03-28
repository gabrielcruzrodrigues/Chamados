using stockman.Models.Dtos;
using stockman.ViewModels;

namespace stockman.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task<LoginResponseDto> LoginAsync(LoginViewModel loginViewModel);
    }
}
