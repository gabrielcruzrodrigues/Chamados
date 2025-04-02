using System.ComponentModel.DataAnnotations;

namespace stockman.ViewModels
{
    public class LoginRequestViewModel
    {
        [Required(ErrorMessage = "O login é obrigatório!")]
        public required string Login { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória!")]
        public required string Password { get; set; }
    }
}
