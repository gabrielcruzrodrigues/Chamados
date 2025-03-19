using Microsoft.EntityFrameworkCore;
using stockman.Database;
using stockman.Extensions;
using stockman.Repositories;
using stockman.Repositories.Interfaces;
using stockman.Services;
using stockman.Services.Interfaces;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//----------------------------- Cors -----------------------------
var OriginsWithAllowedAccess = "OriginsWithAllowedAccess";

builder.Services.AddCors(options =>
    options.AddPolicy(name: OriginsWithAllowedAccess,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200", "http://localhost:9090")
                .AllowAnyHeader()
                .WithMethods("*");
        })
);

// ----------------------- Inject container ------------------------------
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IPasswordService, PasswordService>();

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
app.UseAuthorization();
app.MapControllers();
app.Run();
