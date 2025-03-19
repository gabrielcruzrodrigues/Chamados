﻿namespace stockman.Services;

using Microsoft.AspNetCore.Identity;
using stockman.Services.Interfaces;
public class PasswordService : IPasswordService
{
    private readonly PasswordHasher<object> _passwordHasher = new PasswordHasher<object>();

    public string HashPassword(string password)
    {
        return _passwordHasher.HashPassword(null, password);
    }

    public bool VerifyPassword(string hashedPassword, string providedPassword)
    {
        var result = _passwordHasher.VerifyHashedPassword(null, hashedPassword, providedPassword);
        return result == PasswordVerificationResult.Success;
    }
}
