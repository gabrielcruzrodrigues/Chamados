using stockman.Enuns;

namespace stockman.ViewModels
{
    public class UpdateUserViewModel
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public Roles? Role { get; set; }
    }
}
