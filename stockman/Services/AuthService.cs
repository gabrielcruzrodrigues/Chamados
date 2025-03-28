using stockman.Models.Dtos;
using stockman.Repositories.Interfaces;
using stockman.Services.Interfaces;
using stockman.ViewModels;

namespace stockman.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;

        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<LoginResponseDto> LoginAsync(LoginViewModel loginViewModel)
        {
            return await _authRepository.LoginAsync(loginViewModel);
        }
    }
}
