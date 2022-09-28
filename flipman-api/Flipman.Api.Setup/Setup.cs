using Xunit;
using Flipman.Api.Models;
using System.Security.Cryptography;

namespace Flipman.Api.Setup;

public class Setup
{
    [Fact]
    public async void SetupDatabase()
    {
        var dbContext = new AppDbContext();

        CreatePasswordHash("123456", out byte[] passwordHash, out byte[] passwordSalt);

        var admin = new Employee
        {
            Name = "adm",
            Username = "admin",
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            IsAdmin = true
        };
        await dbContext.Employees.AddAsync(admin);

        var player = new Player(44, "fulano", "fulano", "fulano@email.com", "55999887710");
        await dbContext.Players.AddAsync(player);

        var machine = new Machine("PacMan", 5);
        await dbContext.Machines.AddAsync(machine);

        await dbContext.SaveChangesAsync();
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }
}