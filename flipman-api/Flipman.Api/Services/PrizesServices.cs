using Flipman.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Services;

public interface IPrizesService
{
    public Task<IActionResult> GetPrizes();
    public Task<IActionResult> GetPrize(int id);
    public Task<IActionResult> DecreasePrizeAmount(int id, int amount);
}

public class PrizesService : IPrizesService
{
    private FlipmanDbContext DbContext { get; }
    public PrizesService(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    public async Task<IActionResult> GetPrizes()
    {
        var prizes = await DbContext.Prizes.ToArrayAsync();

        return new OkObjectResult(prizes);
    }

    public async Task<IActionResult> GetPrize(int id)
    {
        var prize = await DbContext.Prizes.Where(prize => prize.Id == id).FirstOrDefaultAsync();

        if (prize == null)
        {
            return new BadRequestObjectResult("PRIZE_NOT_FOUND");
        }

        return new OkObjectResult(prize);
    }

    public async Task<IActionResult> DecreasePrizeAmount(int id, int amount)
    {
        var prize = await DbContext.Prizes.Where(prize => prize.Id == id).FirstOrDefaultAsync();

        if (prize == null)
            return new BadRequestObjectResult("PRIZE_NOT_FOUND");

        prize.Amount -= amount;

        await DbContext.SaveChangesAsync();

        return new OkResult();
    }
}