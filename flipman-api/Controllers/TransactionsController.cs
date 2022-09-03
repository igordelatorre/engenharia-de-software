using Flipman.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[Route("prizeSale")]
[ApiController]
public class TransactionsController : ControllerBase
{
  private FlipmanDbContext DbContext {get;}
  public TransactionsController(FlipmanDbContext dbContext)
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
      return BadRequest("PRIZE_NOT_FOUND");
    }

    return Ok(prize);
  } 

  // O que deve ser informado quando o jogador quiser retirar um prêmio
  // 1. id do jogador
  // 2. quantidade do prêmio a ser retirado

  [HttpPost]
  [Route("{id}")]
  public async Task<IActionResult> PostTransaction([FromRoute] int id, [FromBody] PostTransactionRequest request) 
  {
    var prize = DbContext.Prizes.Where(prize => prize.id == id).FirstOrDefaultAsync();

    if (prize == null) 
    {
      return BadRequest("PRIZE_NOT_FOUND");
    }

    var player = DbContext.Players.Where(player => player.id == request.playerId).FirstOrDefaultAsync();

    if (player == null)
    {
      return BadRequest("PLAYER_NOT_FOUND");
    }

    if (request.quantity > prize.amount)
    {
      return BadRequest("QUANTITY_MUST_BE_LESS_THAN_PRIZE_AMOUNT");
    }

    if (player.tickets < request.quantity * prize.price) 
    {
      return BadRequest("NOT_ENOUGH_TICKETS");
    }

    player.tickets = player.tickets - request.quantity * prize.price;
    prize.amount = prize.amount - request.quantity;

    var newTransaction = new Transaction
    {
      playerId = request.playerId,
      prizeId = request.prizeId,
      datetime = request.datetime,
      quantity = request.quantity
    };

    await DbContext.Transactions.AddAsync(newTransaction);
    await DbContext.SaveChangesAsync();

    return Ok();
  }

  public class PostTransactionRequest
  {
    public int? playerId {get; set;}
    public int? prizeId {get; set;}
    public string? datetime {get; set;}
    public int? quantity {get; set;}
  }
}
