using stockman.Models;
using System.ComponentModel.DataAnnotations;

namespace stockman.ViewModels;

public class CreateSectorViewModel
{
    [Required]
    public required string Name { get; set; }

    public Sector CreateSector()
    {
        return new Sector
        {
            Name = Name,
            CreatedAt = DateTime.UtcNow,
            Status = true
        };
    }
}
