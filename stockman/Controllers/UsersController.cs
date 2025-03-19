using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using stockman.Models;
using stockman.Models.Dtos;
using stockman.Repositories.Interfaces;
using stockman.Services.Interfaces;
using stockman.ViewModels;

namespace stockman.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _userRepository;
        private readonly IPasswordService _passwordService;

        public UsersController(IUsersRepository userRepository, IPasswordService passwordService)
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllAsync()
        {
            var response = await _userRepository.GetAllUsersAsync();
            return Ok(response);
        }

        [HttpGet("{userId:long}")]
        public async Task<ActionResult<UserDto>> GetByIdAsync(long userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateAsync(CreateUserViewModel request)
        {
            var passwordHashed = _passwordService.HashPassword(request.Password);

            var user = new Users 
            {
                Name = request.Name,
                Email = request.Email,
                Role = request.Role,
                CreatedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Password = passwordHashed,
                Status = true
            };

            var response = await _userRepository.CreateAsync(user);
            return StatusCode(201, response);
        }

        [HttpPut("{userId:long}")]
        public async Task<IActionResult> UpdateAsync(long userId, UpdateUserViewModel request)
        {
            var user = await _userRepository.GetByIdWithTrackingAsync(userId);

            user.Name = request.Name ?? user.Name;
            user.Email = request.Email ?? user.Email;

            if (request.Role != null)
                user.Role = request.Role.Value;

            await _userRepository.Update(user);
            return StatusCode(204);
        }

        [HttpDelete("{userId:long}")]
        public async Task<IActionResult> DisableAsync(long userId)
        {
            await _userRepository.Disable(userId);
            return StatusCode(204);
        }
    }
}
