using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using stockman.Database;
using stockman.Extensions;
using stockman.Models;
using stockman.Models.Dtos;
using stockman.Repositories.Interfaces;

namespace stockman.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly StockmanContext _context;
        private readonly ILogger<UsersRepository> _logger;
        private readonly IMapper _mapper;

        public UsersRepository(StockmanContext context, ILogger<UsersRepository> logger, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<UserDto> CreateAsync(Users user)
        {
            try
            {
                _ = await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return _mapper.Map<UserDto>(user);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Um erro aconteceu ao tentar criar um usuário! Err: {ex.Message}");
                throw new HttpResponseException(500, "Um erro aconteceu ao tentar criar um usuário!");
            }
        }

        public async Task Disable(long userId)
        {
            var user = await GetByIdWithTrackingAsync(userId);
            user.Status = false;
            
            try
            {
                _context.Users.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            } catch (Exception ex)
            {
                _logger.LogError($"Um erro aconteceu ao tentar desativar um usuário! err: {ex.Message}");
                throw new HttpResponseException(500, "Um erro aconteceu ao tentar desativar um usuário!");
            }
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _context.Users
                .AsNoTracking()
                .Where(u => u.Status.Equals(true))
                .ToListAsync();

            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto> GetByIdAsync(long userId)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Where(u => u.Status.Equals(true) && u.Id.Equals(userId))
                .FirstOrDefaultAsync();

            if (user is null)
            {
                throw new HttpResponseException(404, $"Usuário não encontrado!");
            }

            return _mapper.Map<UserDto>(user);
        }

        public async Task<Users> GetByIdWithTrackingAsync(long userId)
        {
            var user = await _context.Users
                .Where(u => u.Status.Equals(true) && u.Id.Equals(userId))
                .FirstOrDefaultAsync();

            if (user is null)
            {
                throw new HttpResponseException(404, $"Usuário não encontrado!");
            }

            return user;
        }

        public async Task<Users> GetByEmailAsync(string email)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Where(u => u.Status.Equals(true) && u.Email.Equals(email))
                .FirstOrDefaultAsync();

            return user;
        }

        public async Task<Users> GetByNameAsync(string name)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Where(u => u.Status.Equals(true) && u.Name.Equals(name))
                .FirstOrDefaultAsync();

            return user;
        }

        public async Task Update(Users userForUpdate)
        {
            try
            {
                userForUpdate.LastUpdatedAt = DateTime.UtcNow;
                _context.Users.Entry(userForUpdate).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            } catch (Exception ex)
            {
                _logger.LogError($"Um erro aconteceu ao tentar atualizar um usuário! err: {ex.Message}");
                throw new HttpResponseException(500, "Um erro aconteceu ao tentar atualizar um usuário!");
            }
        }
    }
}
