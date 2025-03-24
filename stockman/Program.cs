using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using stockman.Database;
using stockman.Extensions;
using stockman.Repositories;
using stockman.Repositories.Interfaces;
using stockman.Services;
using stockman.Services.Interfaces;
using System.Reflection;

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
    c.AddSecurityDefinition("cookie", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Cookie,
        Name = "your-auth-cookie-name",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "cookie"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "cookie"
                }
            },
            new string[] {}
        }
    });
});

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
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddScoped<ISectorRepository, SectorRepository>();

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
