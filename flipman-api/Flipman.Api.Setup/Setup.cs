using Xunit;
using Flipman.Api.Models;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Setup;

public class Setup
{
    [Fact]
    public async void SetupDatabase()
    {
        var dbContext = new AppDbContext();

        ClearDatabase(dbContext);

        CreatePasswordHash("123456", out byte[] adminPasswordHash, out byte[] adminPasswordSalt);

        var admin = new Employee
        {
            Name = "adm",
            Username = "admin",
            PasswordHash = adminPasswordHash,
            PasswordSalt = adminPasswordSalt,
            IsAdmin = true
        };
        await dbContext.Employees.AddAsync(admin);

        CreatePasswordHash("123456", out byte[] employeePasswordHash, out byte[] employeePasswordSalt);

        var employee = new Employee
        {
            Name = "atendente",
            Username = "atendente",
            PasswordHash = employeePasswordHash,
            PasswordSalt = employeePasswordSalt,
            IsAdmin = true
        };
        await dbContext.Employees.AddAsync(employee);

        var playerCard = 44;

        var player = new Player(playerCard, "fulano", "fulano", "fulano@email.com", "55999887710")
        {
            Tokens = 4422,
        };
        await dbContext.Players.AddAsync(player);

        var player2 = new Player(11, "josé teste", "jose_teste", "teste@email.com", "55999887710");
        await dbContext.Players.AddAsync(player2);

        var machine = new Machine("PacMan", 5);
        await dbContext.Machines.AddAsync(machine);

        await dbContext.SaveChangesAsync();

        var machineId = await dbContext.Machines.Select(m => m.Id).FirstOrDefaultAsync();

        var match = new Match
        {
            MachineId = machineId,
            PlayerCard = playerCard,
            Datetime = System.DateTime.UtcNow,
            PlayTime = 80,
            Tickets = 22
        };
        await dbContext.Matches.AddAsync(match);

        var match2 = new Match
        {
            MachineId = machineId,
            PlayerCard = playerCard,
            Datetime = System.DateTime.UtcNow.AddDays(-35),
            PlayTime = 80,
            Tickets = 22
        };
        await dbContext.Matches.AddAsync(match2);

        var match3 = new Match
        {
            MachineId = machineId,
            PlayerCard = playerCard,
            Datetime = System.DateTime.UtcNow.AddDays(-8),
            PlayTime = 33,
            Tickets = 11
        };
        await dbContext.Matches.AddAsync(match3);

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

    private void ClearDatabase(AppDbContext dbContext)
    {
        dbContext.Database.ExecuteSqlRaw("DELETE FROM matches");
        dbContext.Database.ExecuteSqlRaw("DELETE FROM prizes_transactions");
        dbContext.Database.ExecuteSqlRaw("DELETE FROM employees");
        dbContext.Database.ExecuteSqlRaw("DELETE FROM prizes");
        dbContext.Database.ExecuteSqlRaw("DELETE FROM machines");
        dbContext.Database.ExecuteSqlRaw("DELETE FROM players");
    }
}