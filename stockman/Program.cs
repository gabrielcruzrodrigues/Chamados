using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using stockman.Database;
using stockman.Extensions;
using stockman.Repositories;
using stockman.Repositories.Interfaces;
using stockman.Services;
using stockman.Services.Interfaces;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//----------------------------- Config Sessions -----------------------------
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(24);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "your-auth-cookie-name";
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
    });

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

//----------------------------- Config Swagger -----------------------------
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo() { Title = "aplicatalogo", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Bearer JWT ",
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[]{}
        }
    });
});

// -------------------- Autentica��o e autoriza��o ---------------------
var secretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
var audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

if (string.IsNullOrEmpty(secretKey) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
{
    throw new InvalidOperationException("Algumas variáveis de ambiente não foram configuradas corretamente.");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
            ValidIssuer = issuer,
            ValidAudience = audience,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };

        // // Permite a configuração de um evento para quando o token for validado
        // options.Events = new JwtBearerEvents
        // {
        //     OnAuthenticationFailed = context =>
        //     {
        //         // Se falhar a autenticação, você pode logar a falha ou fazer algo
        //         Console.WriteLine("Falha na autenticação: " + context.Exception.Message);
        //         return Task.CompletedTask;
        //     },
        //     OnTokenValidated = context =>
        //     {
        //         // Se o token for validado, você pode fazer algo, como logar ou adicionar dados ao contexto
        //         Console.WriteLine("Token validado!");
        //         return Task.CompletedTask;
        //     }
        // };
    });

// Adiciona a autorização
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("admin", policy =>
        policy.RequireAssertion(context =>
            context.User.HasClaim("Role", "admin") &&
            context.User.HasClaim("Role", "moderador") &&
            context.User.HasClaim("Role", "user")));

    options.AddPolicy("moderador", policy =>
        policy.RequireAssertion(context =>
            context.User.HasClaim("Role", "moderador") &&
            context.User.HasClaim("Role", "user")));

    options.AddPolicy("user", policy => policy.RequireClaim("Role", "user"));
});

// Adicionando políticas globais
builder.Services.AddMvc(config =>
{
    var policy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
    config.Filters.Add(new AuthorizeFilter(policy));
}).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

//----------------------------- Cors -----------------------------
var OriginsWithAllowedAccess = "OriginsWithAllowedAccess";

builder.Services.AddCors(options =>
    options.AddPolicy(name: OriginsWithAllowedAccess,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200", "http://localhost:9090")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        })
);
// ----------------------- Inject container ------------------------------
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<ISectorRepository, SectorRepository>();
builder.Services.AddScoped<ICallRepository, CallRepository>();
builder.Services.AddScoped<ISaltRepository, SaltRepository>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();

// -------------------------- Configuring Environment variables --------------------------
builder.Configuration.AddEnvironmentVariables();

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?.Replace("${DB_HOST}", Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost")
    ?.Replace("${DB_PORT}", Environment.GetEnvironmentVariable("DB_PORT") ?? "5432")
    ?.Replace("${DB_NAME}", Environment.GetEnvironmentVariable("DB_NAME") ?? "Stockman")
    ?.Replace("${DB_USER}", Environment.GetEnvironmentVariable("DB_USER") ?? "postgres")
    ?.Replace("${DB_PASS}", Environment.GetEnvironmentVariable("DB_PASS") ?? "1234");

// ---------------- database config ----------------------
string postgreSqlConnection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<StockmanContext>(options =>
    options.UseNpgsql(postgreSqlConnection));

// -------------------------- Configuring AutoMapper --------------------------
builder.Services.AddAutoMapper(typeof(Program));


var app = builder.Build();

// --------- Active the HttpResponseException middleware ------------
app.ConfigureExceptionHandler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(OriginsWithAllowedAccess);
app.UseSession();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
