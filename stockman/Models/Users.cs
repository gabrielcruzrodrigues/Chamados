﻿using stockman.Enuns;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace stockman.Models;

[Table("users")]
public sealed class Users
{
    [Key]
    public long Id { get; set; }

    [Required]
    [StringLength(30, ErrorMessage = "O nome não deve conter mais de 30 caracteres!")]
    public required string Name { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "O email não deve conter mais de 100 caracteres!")]
    public required string Email { get; set; }

    [Required]
    public required string Password { get; set; }

    [Required]
    public required Roles Role { get; set; }

    [Required]
    public required bool Status { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }

    [Required]
    public required DateTime CreatedAt { get; set; }

    [Required]
    public required DateTime LastUpdatedAt { get; set; }

    [Required]
    public required DateTime LastAccess { get; set; }
}