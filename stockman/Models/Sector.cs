using System.ComponentModel.DataAnnotations;

namespace stockman.Models;

public class Sector
{
    [Key]
    public int Id { get; set; }
    [Required]
    public required string Name { get; set; }
    [Required]
    public required bool Status { get; set; } = true;
    [Required]
    public DateTime CreatedAt { get; set; }
    public DateTime LastUpdatedAt { get; set; }
}
