using stockman.Models;
using System.ComponentModel.DataAnnotations;

namespace stockman.ViewModels
{
    public class CreateCallViewModel
    {
        [Required]
        [MinLength(3, ErrorMessage = "O titulo do chamado deve conter pelo menos 3 letras!")]
        public required string Title { get; set; }

        [Required]
        [MinLength(3, ErrorMessage = "O conteúdo é obrigatório!")]
        public required string Content { get; set; }

        [Required]
        public int UserId { get; set; }
        [Required]
        public int SectorId { get; set; }

        public Call CreateCall()
        {
            return new Call
            {
                Title = Title,
                Content = Content,
                CreatedAt = DateTime.UtcNow,
                UserId = UserId,
                SectorId = SectorId,
                Resolved = false
            };
        }
    }
}
