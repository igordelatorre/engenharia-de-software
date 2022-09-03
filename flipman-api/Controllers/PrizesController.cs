using Flipman.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[Route("prizeSale")]
[ApiController]
public class PrizesController : ControllerBase
{
  private FlipmanDbContext DbContext {get;}
  public PrizesController(FlipmanDbContext dbContext)
  {
    DbContext = dbContext;
  }

  [HttpGet]
  public async Task<IActionResult> GetPrizes()
  {
    var prizes = await DbContext.Prizes.ToArrayAsync();

    return Ok(prizes);
  }

  [HttpGet]
  [Route("{id}")]
  public async Task<IActionResult> GetPrize([FromRoute] int id) {
    var prize = await DbContext.Prizes.Where(prize => prize.id == id).FirstOrDefaultAsync();

    if (prize == null) 
    {
      return NoContent();
    }

    return Ok(prize);
  }

  [HttpPost]
  public async Task<IActionResult> PostPrize([FromBody] PostPrizeRequest request)
  {
    if (request.name == null || request.amount == null || request.price == null) 
    {
      return BadRequest();
    }

    var newPrize = new Prize
    {
      name = request.name,
      amount = request.amount,
      price = request.price
    };

    await DbContext.Prizes.AddAsync(newPrize);
    await dbContext.SaveChangesAsync();

    return Ok();
  }

  public class PostPrizeRequest
  {
    public string? name {get; set;}
    public int? amount {get; set;}
    public int? price {get; set;} 
  }

  [HttpPut]
  [Route("{id}")]
  public async Task<IActionResult> UpdatePrizeQuantity([FromRoute] int id, [FromBody] PutPrizeRequest request)
  {
    if (request.amount == null) 
    {
      return BadRequest("AMOUNT_CANNOT_BE_NULL");
    }

    var prize = await DbContext.Prizes.Where(prize => prize.id == id);

    if (request.amount > prize.amount) 
    {
      return BadRequest("AMOUNT_MUST_BE_LESS_THAN_CURRENT_AMOUNT");
    }

    prize.amount = prize.amount - request.amount;

    await DbContext.SaveChangesAsync();

    return Ok();
  }

  public class PutPlayerRequest
  {
    public int? amount {get; set;}
  }
}