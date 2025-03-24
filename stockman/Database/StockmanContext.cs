using Microsoft.EntityFrameworkCore;
using stockman.Models;

namespace stockman.Database;

public class StockmanContext : DbContext
{
    public StockmanContext(DbContextOptions<StockmanContext> options) : base(options) {}
    
    public DbSet<Users>? Users { get; set; }
    public DbSet<Sector>? Sectors { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Users>()
            .HasIndex(u => u.Name)
            .IsUnique();

        modelBuilder.Entity<Users>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Sector>()
            .HasIndex(s => s.Name)
            .IsUnique();
    }
}