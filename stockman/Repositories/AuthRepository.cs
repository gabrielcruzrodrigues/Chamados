namespace stockman.Repositories;
using Microsoft.EntityFrameworkCore;
using stockman.Database;
using stockman.Enuns;
using stockman.Extensions;

using stockman.Models.Dtos;
using stockman.Repositories.Interfaces;
using stockman.Services.Interfaces;
using stockman.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

public class AuthRepository : IAuthRepository
{
    private readonly IUsersRepository _userRepository;
    private readonly ILogger<AuthRepository> _logger;
    private readonly ITokenService _tokenService;
    private readonly StockmanContext _context;

    public AuthRepository(
        IUsersRepository userRepository, 
        ILogger<AuthRepository> logger, 
        ITokenService tokenService,
        StockmanContext context
    )
    {
        _userRepository = userRepository;
        _logger = logger;
        _tokenService = tokenService;
        _context = context;
    }

    public async Task<LoginResponseDto> LoginAsync(LoginViewModel loginViewModel)
    {
        var user = await _userRepository.GetByEmailAsync(loginViewModel.Email);
        if (user is null)
        {
            throw new HttpResponseException(404, $"Usuário com o email: {loginViewModel.Email} não encontrado!");
        }

        string? salt;
        try
        {
            salt = await _context.Salts
                .AsNoTracking()
                .Where(s => s.UserId.Equals(user.Id))
                .Select(s => s.SaltHash)
                .FirstAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Um erro aconteceu ao tentar buscar o salt no banco de dados! err: {ex.Message}");
            throw new HttpResponseException(500, "Um erro aconteceu ao tentar buscar o salt no banco de dados!");
        }

        if (!PasswordHashManager.VerifyPassword(loginViewModel.Password, user.Password, salt))
        {
            throw new HttpResponseException(400, "Senha incorreta!");
        }

        var userRole = user.Role;
        IEnumerable<Claim> authClaims = new List<Claim>();

        if (userRole.Equals(Roles.ADMIN))
        {
            authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name!),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("Role", Roles.ADMIN.ToString().ToLower()),
                new Claim("Role", Roles.MODERADOR.ToString().ToLower()),
                new Claim("Role", Roles.USER.ToString().ToLower()),
            };
        }

        if (userRole.Equals(Roles.MODERADOR))
        {
            authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name!),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("Role", Roles.MODERADOR.ToString().ToLower()),
                new Claim("Role", Roles.USER.ToString().ToLower()),
            };
        }

        if (userRole.Equals(Roles.USER))
        {
            authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name!),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("Role", Roles.USER.ToString().ToLower()),
            };
        }

        var token = _tokenService.GenerateAccessToken(authClaims);
        var refreshToken = _tokenService.GenerateRefreshToken();


        var verify = int.TryParse(Environment.GetEnvironmentVariable("JWT_REFRESH_TOKEN_VALIDITY_IN_MINUTES"),
            out int refreshTokenValidityInMinutes);
        if (!verify)
        {
            throw new InvalidOperationException("Valor inválido para JWT_REFRESH_TOKEN_VALIDITY_IN_MINUTES");
        }

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddMinutes(refreshTokenValidityInMinutes);

        try
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Um erro aconteceu ao tentar criar os tokens de acesso! err: {ex.Message}");
            throw new HttpResponseException(500, "Um erro aconteceu ao tentar criar os tokens de acesso!");
        }

        return new LoginResponseDto
        {
            UserId = user.Id,
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            RefreshToken = refreshToken,
            Expiration = token.ValidTo
        };
    }
}
