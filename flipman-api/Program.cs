using Flipman.Api.Models;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        String? connectionString;

        if (builder.Environment.IsProduction())
        {
            connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

            if (connectionString == null)
            {
                throw new Exception("DB_CONNECTION_STRING_NOT_FOUND");
            }

        }
        else
        {
            connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        }

        builder.Services.AddDbContext<FlipmanDbContext>(o => o.UseNpgsql(connectionString));

        builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
        {
            builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
        }));

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("corsapp");
        app.UseHttpsRedirection();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}