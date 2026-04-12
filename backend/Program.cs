using CloudBackend.Data;
using Microsoft.EntityFrameworkCore;
using CloudBackend.Models;

var builder = WebApplication.CreateBuilder(args);

// --- SEKCJA USŁUG (Dependency Injection) ---

// 1. Rejestracja Kontrolerów
builder.Services.AddControllers();

// 2. Dokumentacja API (Swagger/OpenAPI)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 3. Pobranie Connection Stringa z konfiguracji (Secret Manager przez ENV)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 4. Rejestracja bazy danych MS SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString,
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null)
    ));
 

// 5. Konfiguracja CORS - pozwala Reactowi na dostęp do API
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// --- AUTOMATYCZNE TWORZENIE BAZY I DANYCH ---

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();

        // context.Database.EnsureCreated();

        if (!context.Tasks.Any())
        {
            context.Tasks.AddRange(
                new CloudTask { Name = "Zrobić kawę", IsCompleted = true },
                new CloudTask { Name = "Uruchomić projekt w Dockerze", IsCompleted = false }
            );

            context.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Błąd podczas tworzenia bazy: {ex.Message}");
    }
}

// --- SEKCJA POTOKU HTTP ---

app.UseSwagger();

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cloud API V1");
    c.RoutePrefix = string.Empty;
});

app.UseCors();

app.MapControllers();

app.Run();