namespace stockman.Models.Dtos
{
    public class CallDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Resolved { get; set; }
        public string UserName { get; set; }
        public string SectorName { get; set; }
        public string AttendedByName { get; set; }
        public string AttendedTime { get; set; }
        public Sector Sector { get; set; } 
        public UserDto User { get; set; }

    }
}
