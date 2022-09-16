using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Models;

public class FlipmanDbContext : DbContext
{
    public FlipmanDbContext(DbContextOptions<FlipmanDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Player>(b =>
        {
            b.ToTable("players");
            b.HasKey(player => player.Id);
        });

        modelBuilder.Entity<Prize>(b =>
        {
            b.ToTable("prizes");
            b.HasKey(prize => prize.Id);
        });

        modelBuilder.Entity<Transaction>(b =>
        {
            b.ToTable("transactions");
            b.HasKey(transaction => transaction.Id);
        });

        modelBuilder.Entity<Employee>(b =>
        {
            b.ToTable("employees");
            b.HasKey(employee => employee.Id);
        });
    }
    public DbSet<Player> Players { get; set; }
    public DbSet<Prize> Prizes { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Employee> Employees { get; set; }
}