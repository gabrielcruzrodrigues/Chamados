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
        private readonly IPasswordService _passwordService;
        private readonly IUsersRepository _userRepository;

        public AuthController(IPasswordService passwordService, IUsersRepository usersRepository)
        {
            _passwordService = passwordService;
            _userRepository = usersRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestViewModel request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);

            if (_passwordService.VerifyPassword(user.Password, request.Password))
            {
                HttpContext.Session.SetString("Email", user.Email);
                HttpContext.Session.SetString("Role", user.Role.ToString());
                return Ok(new { message = "Login realizado com sucesso!" });
            } 
            else
            {
                return BadRequest("Credenciais incorretas!");
            }

        }

        [HttpGet("session")]
        public async Task<ActionResult> CheckSession()
        {
            var user = HttpContext.Session.GetString("Email");

            if (string.IsNullOrEmpty(user))
                return Unauthorized(new { message = "Sessão expirada ou inexistente!" });

            return Ok(new { message = "Usuário authenticado!", user });
        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            HttpContext.Session.Clear();
            return Ok(new { message = "Logout realizado com sucesso!" });
        }
    }
}
