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
            b.HasKey(player => player.id);
        });

        modelBuilder.Entity<Prize>(b => 
        {
            b.ToTable("prizes");
            b.HasKey(prize => prize.id)
        });

        modelBuilder.Entity<Transaction>(b => {
            b.ToTable("transactions");
            b.HasKey(transaction => transaction.id);
        });
    }
    public DbSet<Player> Players {get; set;}
    public DbSet<Prize> Prizes {get; set;}
    public DbSet<Transaction> Transactions {get; set;}
}