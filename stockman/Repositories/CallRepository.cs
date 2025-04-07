namespace stockman.Repositories;

using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using stockman.Database;
using stockman.Extensions;

using stockman.Models;
using stockman.Models.Dtos;
using stockman.Repositories.Interfaces;
using System;

public class CallRepository : ICallRepository
{
    private readonly StockmanContext _context;
    private readonly ILogger<CallRepository> _logger;

    public CallRepository(StockmanContext context, ILogger<CallRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Call> CreateAsync(Call call)
    {
        try
        {
            await _context.Calls.AddAsync(call);
            await _context.SaveChangesAsync();
            return call;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Um erro ocorreu ao tentar criar um chamado! err: {ex.Message}");
            throw new HttpResponseException(400, "Um erro ocorreu ao tentar criar um chamado");
        }
    }

    //public async Task DeleteAsync(Call call)
    //{
    //    try
    //    {
    //        _context.Calls.Remove(call);
    //        await _context.SaveChangesAsync();
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError($"Un error occured when tryning delete a called! - err: {ex.Message}");
    //        throw new HttpResponseException(400, "Un error occured when tryning delete a called!");
    //    }
    //}

    public async Task<IEnumerable<CallDto>> GetAllAsync()
    {
        return await _context.Calls
            .AsNoTracking()
            .Where(c => c.Resolved.Equals(false))
            .Include(c => c.Sector)
            .Include(u => u.User)
            .Select(c => new CallDto
            {
                Id = c.Id,
                Title = c.Title,
                Content = c.Content,
                CreatedAt = c.CreatedAt,
                AttendedByName = c.AttendedBy.Name,
                AttendedTime = c.AttendedTime.ToString(),
                SectorName = c.Sector.Name,
                UserName = c.User.Name,
                Resolved = c.Resolved,
                Sector = c.Sector,
                User = new UserDto
                {
                    Id = c.User.Id,
                    Name = c.User.Name,
                    Email = c.User.Email,
                    Role = c.User.Role,
                    CreatedAt = c.User.CreatedAt,
                    LastUpdatedAt = c.User.LastUpdatedAt,
                    LastAccess = c.User.LastAccess
                }
            })
            .ToListAsync();
    }

    public async Task<Call> GetByIdAsync(long callId)
    {
        var call = await _context.Calls
            .FirstOrDefaultAsync(u => u.Id == callId);

        if (call is null)
        {
            throw new HttpResponseException(404, "O chamado não foi encontrado!");
        }

        return call;
    }

    public async Task UpdateAsync(Call call)
    {
        try
        {
            _context.Entry(call).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Um erro aconteceu ao tentar atualizar um chamado! err: {ex.Message}");
            throw new HttpResponseException(400, "Um erro aconteceu ao tentar atualizar um chamado!");
        }
    }

    public async Task<IEnumerable<CallDto>> GetByUserIdAsync(long userId)
    {
        return await _context.Calls
            .AsNoTracking()
            .Where(c => c.UserId.Equals(userId))
            .Include(c => c.Sector)
            .Include(u => u.User)
            .Select(c => new CallDto
            {
                Id = c.Id,
                Title = c.Title,
                Content = c.Content,
                CreatedAt = c.CreatedAt,
                AttendedByName = c.AttendedBy.Name,
                AttendedTime = c.AttendedTime.ToString(),
                SectorName = c.Sector.Name,
                UserName = c.User.Name,
                Resolved = c.Resolved,
                Sector = c.Sector
            })
        .ToListAsync();
    }

    public async Task<PagedResult<CallDto>> GetResolvedCalls(int page, int size)
    {
        var calls = await _context.Calls
            .AsNoTracking()
            .Where(c => c.Resolved.Equals(true))
            .OrderByDescending(c => c.AttendedTime)
            .Include(c => c.Sector)
            .Include(u => u.User)
            .Skip((page - 1) * size)
            .Take(size)
            .Select(c => new CallDto
            {
                Id = c.Id,
                Title = c.Title,
                Content = c.Content,
                CreatedAt = c.CreatedAt,
                AttendedByName = c.AttendedBy.Name,
                AttendedTime = c.AttendedTime.ToString(),
                SectorName = c.Sector.Name,
                UserName = c.User.Name,
                Resolved = c.Resolved,
                Sector = c.Sector
            })
            .ToListAsync();

        var result = new PagedResult<CallDto>
        {
            TotalItems = await _context.Calls.Where(c => c.Resolved.Equals(true)).CountAsync(),
            Page = page,
            PageSize = size,
            Items = calls
        };

        return result;
    }

    public async Task<IEnumerable<Call>> GetBySectorIdAsync(int sectorId)
    {
        return await _context.Calls
            .AsNoTracking()
            .Where(c => c.SectorId.Equals(sectorId))
            .ToListAsync();
    }
}
