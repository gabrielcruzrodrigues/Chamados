using System.ComponentModel.DataAnnotations;

namespace stockman.Models
{
    public class Salt
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public long UserId { get; set; }

        [Required]
        [StringLength(256)]
        public string? SaltHash { get; set; }

        public Users User { get; set; }
    }
}
