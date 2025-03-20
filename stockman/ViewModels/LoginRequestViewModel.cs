using System.ComponentModel.DataAnnotations;

namespace stockman.ViewModels
{
    public class LoginRequestViewModel
    {
        [Required(ErrorMessage = "O email é obrigatório!")]
        [EmailAddress(ErrorMessage = "Email inválido!")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória!")]
        public required string Password { get; set; }
    }
}
