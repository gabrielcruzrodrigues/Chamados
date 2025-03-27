using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace stockman.Models;

public class Call
{
    [Key]
    public long Id { get; set; }
    [Required]
    [MinLength(3, ErrorMessage = "O Titulo deve conter pelomenos 3 letras")]
    public required string Title { get; set; }
    [Required]
    public required string Content { get; set; }
    [Required]
    public required DateTime CreatedAt { get; set; }
    [Required]
    public long UserId { get; set; }
    [Required]
    public int SectorId { get; set; }
    [Required]
    public bool Resolved { get; set; } = false;

    [ForeignKey("UserId")]
    public Users User { get; set; }
    public Sector Sector { get; set; }
}
