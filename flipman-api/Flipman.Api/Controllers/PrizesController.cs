using Flipman.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[Route("prizes")]
[ApiController]
public class PrizesController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }
    public PrizesController(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    [HttpGet]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> GetPrizes()
    {
        var prizes = await DbContext.Prizes.ToArrayAsync();

        return Ok(prizes);
    }

    [HttpGet]
    [Route("{id}")]
    [Authorize(policy: "Manager")]

    public async Task<IActionResult> GetPrize([FromRoute] int id)
    {
        var prize = await DbContext.Prizes.Where(prize => prize.Id == id).FirstOrDefaultAsync();

        if (prize == null)
        {
            return BadRequest("PRIZE_NOT_FOUND");
        }

        return Ok(prize);
    }

    [HttpPost]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> PostPrize([FromBody] PostPrizeRequest request)
    {
        if (request.name == null || request.amount == null || request.price == null)
        {
            return BadRequest();
        }

        var newPrize = new Prize
        {
            Name = request.name,
            Amount = (int)request.amount,
            Price = (int)request.price
        };

        await DbContext.Prizes.AddAsync(newPrize);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostPrizeRequest
    {
        public string? name { get; set; }
        public int? amount { get; set; }
        public int? price { get; set; }
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> UpdatePrizeAmount([FromRoute] int id, [FromBody] PutPrizeRequest request)
    {
        if (request.amount == null)
        {
            return BadRequest("AMOUNT_CANNOT_BE_NULL");
        }

        var prize = await DbContext.Prizes.Where(prize => prize.Id == id).FirstOrDefaultAsync();

        if (prize == null)
        {
            return BadRequest("PRIZE_NOT_FOUND");
        }

        if (request.amount == prize.Amount)
        {
            return BadRequest("SPECIFY_A_VALUE");
        }

        prize.Amount = (int)request.amount;

        if (request.price != null && request.price != prize.Price)
        {
            prize.Price = (int)request.price;
        }

        if (request.name != null && request.name != prize.Name)
        {
            prize.Name = request.name;
        }

        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PutPrizeRequest
    {
        public string? name { get; set; }
        public int? amount { get; set; }
        public int? price { get; set; }
    }
}