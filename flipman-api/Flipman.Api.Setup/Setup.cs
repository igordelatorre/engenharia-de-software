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
            Name = "Administrador",
            Username = "admin",
            PasswordHash = adminPasswordHash,
            PasswordSalt = adminPasswordSalt,
            IsAdmin = true
        };
        await dbContext.Employees.AddAsync(admin);

        var playerCard = "4489655621210786";

        var player = new Player(playerCard, "Marcos da Silva", "marcossilva@gmail.com", "marcossilva@gmail.com", "51994657633")
        {
            Tokens = 2,
            Tickets = 15,
        };
        await dbContext.Players.AddAsync(player);

        var player2 = new Player("6564875510030245", "Leonardo Oliveira", "leoliveira@hotmail.com", "leoliveira@hotmail.com", "51995472265")
        {
            Tokens = 2,
            Tickets = 5,
        };
        await dbContext.Players.AddAsync(player2);


        var machine = new Machine("PacMan", 3);
        await dbContext.Machines.AddAsync(machine);

        var machine2 = new Machine("Pinball", 1);
        await dbContext.Machines.AddAsync(machine2);

        var prize = new Prize
        {
            Name = "Pirulito",
            Amount = 67,
            Price = 1,
            IsActive = true,
        };
        await dbContext.Prizes.AddAsync(prize);

        var prize2 = new Prize
        {
            Name = "Amoeba",
            Amount = 8,
            Price = 50,
            IsActive = true,
        };
        await dbContext.Prizes.AddAsync(prize2);

        await dbContext.SaveChangesAsync();

        var machineId = await dbContext.Machines.Select(m => m.Id).FirstOrDefaultAsync();

        var match = new Match
        {
            MachineId = machineId,
            PlayerCard = playerCard,
            Datetime = System.DateTime.UtcNow,
            PlayTime = 15,
            Tickets = 15
        };
        await dbContext.Matches.AddAsync(match);

        var prizeId = await dbContext.Prizes.Select(p => p.Id).FirstOrDefaultAsync();

        var prizeTransaction = new PrizeTransaction
        {
            PlayerCard = playerCard,
            PrizeId = prizeId,
            Datetime = System.DateTime.UtcNow.AddDays(-5),
            Quantity = 3
        };
        await dbContext.PrizeTransactions.AddAsync(prizeTransaction);

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