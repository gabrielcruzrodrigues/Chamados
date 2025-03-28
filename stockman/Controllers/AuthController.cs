using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stockman.Repositories.Interfaces;
using stockman.Services.Interfaces;
using stockman.ViewModels;

namespace stockman.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUsersRepository _userRepository;
        private readonly IAuthService _authService;

        public AuthController(IUsersRepository usersRepository, IAuthService authService)
        {
            _userRepository = usersRepository;
            _authService = authService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel request)
        {
            var credentials = await _authService.LoginAsync(request);
            return Ok(credentials);
        }

        [HttpPost("logout")]
        [Authorize(policy: "user")]
        public async Task<ActionResult> Logout()
        {
            HttpContext.Session.Clear();
            return Ok(new { message = "Logout realizado com sucesso!" });
        }
    }
}
