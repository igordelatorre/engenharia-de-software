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
            b.HasKey(player => player.Card);
        });

        modelBuilder.Entity<Prize>(b =>
        {
            b.ToTable("prizes");
            b.HasKey(prize => prize.Id);
        });

        modelBuilder.Entity<PrizeTransaction>(b =>
        {
            b.ToTable("prizes_transactions");
            b.HasKey(transaction => transaction.Id);
        });

        modelBuilder.Entity<Employee>(b =>
        {
            b.ToTable("employees");
            b.HasKey(employee => employee.Id);
        });

        modelBuilder.Entity<Match>(b =>
        {
            b.ToTable("matches");
            b.HasKey(match => match.Id);
        });

        modelBuilder.Entity<Machine>(b =>
        {
            b.ToTable("machines");
            b.HasKey(machine => machine.Id);
        });
    }
    public DbSet<Player> Players { get; set; }
    public DbSet<Prize> Prizes { get; set; }
    public DbSet<PrizeTransaction> PrizeTransactions { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Match> Matches { get; set; }
    public DbSet<Machine> Machines { get; set; }
}