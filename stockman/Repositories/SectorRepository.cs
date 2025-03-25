using Microsoft.EntityFrameworkCore;
using stockman.Database;
using stockman.Extensions;
using stockman.Models;
using stockman.Repositories.Interfaces;
using System;

namespace stockman.Repositories;

public class SectorRepository : ISectorRepository
{
    private readonly StockmanContext _context;
    private readonly ILogger<SectorRepository> _logger;

    public SectorRepository(StockmanContext context, ILogger<SectorRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Sector> CreateAsync(Sector sector)
    {
        try
        {
            await _context.Sectors.AddAsync(sector);
            await _context.SaveChangesAsync();
            return sector;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Um erro ocorreu ao tentar criar um novo setor! err: {ex.Message}");
            throw new HttpResponseException(400, "Um erro ocorreu ao tentar criar um novo setor");
        }
    }

    public async Task DeleteAsync(Sector sector)
    {
        try
        {
            _context.Sectors.Entry(sector).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Um erro aconteceu ao tentar desativar o setor! - err: {ex.Message}");
            throw new HttpResponseException(400, "Um erro aconteceu ao tentar desativar o setor!");
        }
    }

    public async Task<IEnumerable<Sector>> GetAllAsync()
    {
        return await _context.Sectors
            .AsNoTracking()
            .Where(s => s.Status.Equals(true))
            .ToListAsync();
    }

    public async Task<Sector> GetByIdAsync(int sectorId)
    {
        var sector = await _context.Sectors
            .AsNoTracking()
            .Where(s => s.Status.Equals(true))
            .FirstOrDefaultAsync(u => u.Id == sectorId);

        if (sector is null)
        {
            throw new HttpResponseException(404, "O setor não foi encontrado!");
        }

        return sector;
    }

    public async Task<Sector> GetByNameAsync(string sectorName)
    {
        var sector = await _context.Sectors
            .AsNoTracking()
            .Where(s => s.Status.Equals(true))
            .FirstOrDefaultAsync(u => u.Name.Equals(sectorName));

        return sector;
    }

    public async Task<Sector> GetByIdWithTrackingAsync(int sectorId)
    {
        var sector = await _context.Sectors
            .Where(s => s.Status.Equals(true))
            .FirstOrDefaultAsync(u => u.Id.Equals(sectorId) && u.Status.Equals(true));

        if (sector is null)
        {
            throw new HttpResponseException(404, "O setor não foi encontrado!");
        }

        return sector;
    }

    public async Task UpdateAsync(Sector sector)
    {
        try
        {
            _context.Entry(sector).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Um erro aconteceu ao tentar atualizar o setor! err: {ex.Message}");
            throw new HttpResponseException(400, "Um erro aconteceu ao tentar atualizar o setor!");
        }
    }
}


