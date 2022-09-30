using Flipman.Api.Models;
using Flipman.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[ApiController]
public class PrizesController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }
    private readonly IPrizesService _prizesService;
    public PrizesController(FlipmanDbContext dbContext, IPrizesService prizesService)
    {
        DbContext = dbContext;
        _prizesService = prizesService;
    }


    [HttpGet]
    [Route("prizes")]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> GetPrizes()
    {
        return await _prizesService.GetPrizes();
    }

    [HttpGet]
    [Route("prize/{prizeId}")]
    [Authorize(policy: "Manager")]

    public async Task<IActionResult> GetPrize([FromRoute] int prizeId)
    {
        return await _prizesService.GetPrize(prizeId);
    }

    [HttpPost]
    [Route("prize")]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> PostPrize([FromBody] PostPrizeRequest request)
    {
        if (request.Name == null || request.Amount == null || request.Price == null)
        {
            return BadRequest();
        }

        var newPrize = new Prize
        {
            Name = request.Name,
            Amount = (int)request.Amount,
            Price = (int)request.Price
        };

        await DbContext.Prizes.AddAsync(newPrize);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostPrizeRequest
    {
        public string? Name { get; set; }
        public int? Amount { get; set; }
        public int? Price { get; set; }
    }

    [HttpPost]
    [Route("prize-amount/{prizeId}")]
    [Authorize(policy: "Manager")]

    public async Task<IActionResult> RemoveAmountFromPrize([FromRoute] int prizeId, [FromBody] RemoveAmountFromPrizeRequest request)
    {
        if (request.Amount == null)
            return BadRequest();

        return await _prizesService.DecreasePrizeAmount(prizeId, (int)request.Amount);
    }

    public class RemoveAmountFromPrizeRequest
    {
        public int? Amount { get; set; }
    }

}