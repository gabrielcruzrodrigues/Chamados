namespace stockman.Models.Dtos
{
    public class CallDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Resolved { get; set; }
        public Sector Sector { get; set; } 
        public UserDto User { get; set; }

    }
}
