using stockman.Models;

namespace stockman.Repositories.Interfaces;

public interface ISectorRepository
{
    Task<Sector> CreateAsync(Sector sector);
    Task<IEnumerable<Sector>> GetAllAsync();
    Task<Sector> GetByIdAsync(int sector);
    Task<Sector> GetByNameAsync(string sectorName);
    Task<Sector> GetByIdWithTrackingAsync(int sector);
    Task UpdateAsync(Sector sector);
    Task DeleteAsync(Sector sector);
}

