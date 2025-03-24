using stockman.Enuns;

namespace stockman.ViewModels
{
    public class UpdateUserViewModel
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int Role { get; set; }
    }
}
