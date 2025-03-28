using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using stockman.Extensions;
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
        private readonly ISaltRepository _saltRepository;

        public UsersController(IUsersRepository userRepository, ISaltRepository saltRepository)
        {
            _userRepository = userRepository;
            _saltRepository = saltRepository;
        }

        [HttpGet]
        [Authorize(policy: "moderador")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllAsync()
        {
            var response = await _userRepository.GetAllUsersAsync();
            return Ok(response);
        }

        [HttpGet("{userId:long}")]
        [Authorize(policy: "moderador")]
        public async Task<ActionResult<UserDto>> GetByIdAsync(long userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            return Ok(user);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> CreateAsync(CreateUserViewModel request)
        {
            var emailVerify = await _userRepository.GetByEmailAsync(request.Email);
            if (emailVerify != null)
            {
                return Conflict(new { message = "Esse email já foi cadastrado", type = "email", code = 409 });
            }

            if (await _userRepository.GetByNameAsync(request.Name) != null)
            {
                return Conflict(new { message = "Esse nome já foi cadastrado", type = "name", code = 409 });
            }

            var user = new Users
            {
                Name = request.Name,
                Email = request.Email,
                Role = request.Role,
                CreatedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Password = "passwordHashed",
                LastAccess = DateTime.UtcNow,
                Status = true
            };

            var (hash, salt) = PasswordHashManager.HashGenerate(request.Password);
            user.Password = hash;

            var response = await _userRepository.CreateAsync(user);

            var saltObj = new Salt()
            {
                UserId = user.Id,
                SaltHash = salt
            };

            await _saltRepository.Create(saltObj);

            return StatusCode(201, response);
        }

        [HttpPut]
        [Authorize(policy: "admin")]
        public async Task<IActionResult> UpdateAsync(UpdateUserViewModel request)
        {
            var user = await _userRepository.GetByIdWithTrackingAsync(request.Id);
            var emailVerify = await _userRepository.GetByEmailAsync(request.Email);
            var nameVerify = await _userRepository.GetByNameAsync(request.Name);

            if (emailVerify != null && emailVerify.Email != user.Email)
                return Conflict("Este email já esta cadastrado, tente um email diferente!");

            if (nameVerify != null && nameVerify.Name != user.Name)
                return Conflict("Este nome já esta cadastrado, tente um nome diferente!");

            user.Name = request.Name ?? user.Name;
            user.Email = request.Email ?? user.Email;

            if (request.Role != null)
            {
                if (request.Role == 0)
                {
                    user.Role = Enuns.Roles.ADMIN;
                }
                if (request.Role == 1)
                {
                    user.Role = Enuns.Roles.USER;
                }
                if (request.Role == 2)
                {
                    user.Role = Enuns.Roles.MODERADOR;
                }
            }

            user.LastUpdatedAt = DateTime.UtcNow;

            if (!request.Password.IsNullOrEmpty())
            {
                var salt = await _saltRepository.GetByUserId(user.Id);
                var (hash, saltHash) = PasswordHashManager.HashGenerate(request.Password);
                user.Password = hash;

                await _userRepository.Update(user);
                await _saltRepository.Update(user.Id, saltHash);

            }
            return StatusCode(204);
        }

        [HttpDelete("{userId:long}")]
        [Authorize(policy: "admin")]
        public async Task<IActionResult> DisableAsync(long userId)
        {
            await _userRepository.Disable(userId);
            return StatusCode(204);
        }

        [HttpGet("search/{param}")]
        [Authorize(policy: "moderador")]
        public async Task<ActionResult> Search(string param)
        {
            var users = await _userRepository.Search(param);
            return Ok(users);
        }
    }
}
