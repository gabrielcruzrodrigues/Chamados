using System.ComponentModel.DataAnnotations;

namespace stockman.Models.Dtos
{
    public class LoginResponseDto
    {
        public required long UserId { get; set; }
        public required string Token { get; set; }
        public required string RefreshToken { get; set; }
        public DateTime Expiration { get; set; }
    }
}
