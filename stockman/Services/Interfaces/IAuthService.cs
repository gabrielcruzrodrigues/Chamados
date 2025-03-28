namespace stockman.Services.Interfaces;
using stockman.Models.Dtos;
using stockman.ViewModels;

public interface IAuthService
{
    Task<LoginResponseDto> LoginAsync(LoginViewModel loginViewModel);
}
