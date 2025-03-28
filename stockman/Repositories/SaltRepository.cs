using Microsoft.EntityFrameworkCore;
using stockman.Database;
using stockman.Extensions;
using stockman.Models;
using stockman.Repositories.Interfaces;

namespace stockman.Repositories
{
    public class SaltRepository : ISaltRepository
    {
        private readonly StockmanContext _context;
        private readonly ILogger<SaltRepository> _logger;

        public SaltRepository(StockmanContext context, ILogger<SaltRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task Create(Salt salt)
        {
            try
            {
                await _context.Salts.AddAsync(salt);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Um erro aconteceu ao tentar salvar o Salts no banco de dados! err: {ex.Message}");
                throw new HttpResponseException(500, "Um erro aconteceu ao tentar salvar o Salts no banco de dados!");
            }
        }

        public async Task<Salt> GetByUserId(long userId)
        {
            var salt = await _context.Salts
                .Where(s => s.UserId.Equals(userId))
                .FirstOrDefaultAsync();

            if (salt is null)
            {
                throw new HttpResponseException(404, "Salt de usuário não encontrado!");
            }

            return salt;
        }

        public async Task Update(long userId, string newSalt)
        {
            var salt = await GetByUserId(userId);
            salt.SaltHash = newSalt;

            try
            {
                _context.Salts.Entry(salt).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Um erro aconteceu ao tentar atualizar o Salts no banco de dados! err: {ex.Message}");
                throw new HttpResponseException(500, "Um erro aconteceu ao tentar atualizar o Salts no banco de dados!");
            }
        }
    }
}
