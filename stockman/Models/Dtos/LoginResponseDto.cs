using stockman.Enuns;
using System.ComponentModel.DataAnnotations;

namespace stockman.Models.Dtos
{
    public class LoginResponseDto
    {
        public required string? Name { get; set; }
        public required long UserId { get; set; }
        public required string Token { get; set; }
        public required string RefreshToken { get; set; }
        public DateTime Expiration { get; set; }
        public Roles? Role { get; set; }
    }
}
