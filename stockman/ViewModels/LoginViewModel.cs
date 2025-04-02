using System.ComponentModel.DataAnnotations;

namespace stockman.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }

        public LoginViewModel(string login, string password)
        {
            Login = login;
            Password = password;
        }
    }
}
