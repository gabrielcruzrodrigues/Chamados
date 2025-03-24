using stockman.Models;
using System.ComponentModel.DataAnnotations;

namespace stockman.ViewModels;

public class UpdateSectorViewModel
{
    [Required]
    public required string Name { get; set; }

    public Sector UpdateSector(Sector sector)
    {
        sector.Name = Name;
        return sector;
    }

}
