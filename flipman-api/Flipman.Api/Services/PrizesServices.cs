using Flipman.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Services;

public interface IPrizesService
{
  public Task<IActionResult> GetPrizes();
  public Task<IActionResult> GetPrize(int id);
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

    return Ok(prizes);
  }

  public async Task<IActionResult> GetPrize(int id)
  {
    var prize = await DbContext.Prizes.Where(prize => prize.Id == id).FirstOrDefaultAsync();

    if (prize == null)
    {
      return BadRequest("PRIZE_NOT_FOUND");
    }

    return Ok(prize);
  }
}