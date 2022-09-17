using Flipman.Api.Models;
using Flipman.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[Route("prizeSale")]
[ApiController]
public class TransactionsController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }
    private readonly IPrizesService _prizesService;
    public TransactionsController(FlipmanDbContext dbContext, IPrizesService prizesService)
    {
        DbContext = dbContext;
        _prizesService = prizesService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetPrizes()
    {
        return await _prizesService.GetPrizes();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetPrize([FromRoute] int id)
    {
        return await _prizesService.GetPrize(id);
    }

    [HttpPost]
    [Route("{id}")]
    public async Task<IActionResult> PostTransaction([FromRoute] int id, [FromBody] PostTransactionRequest request)
    {
        if (request.quantity == null)
        {
            return BadRequest("QUANTITY_CANNOT_BE_NULL");
        }

        var prize = await DbContext.Prizes.Where(prize => prize.Id == id).FirstOrDefaultAsync();

        if (prize == null)
        {
            return BadRequest("PRIZE_NOT_FOUND");
        }

        var player = await DbContext.Players.Where(player => player.Id == request.playerId).FirstOrDefaultAsync();

        if (player == null)
        {
            return BadRequest("PLAYER_NOT_FOUND");
        }

        if (request.quantity > prize.Amount)
        {
            return BadRequest("QUANTITY_MUST_BE_LESS_THAN_PRIZE_AMOUNT");
        }

        if (player.Tickets < request.quantity * prize.Price)
        {
            return BadRequest("NOT_ENOUGH_TICKETS");
        }

        var quantity = (int)request.quantity;

        player.Tickets = player.Tickets - quantity * prize.Price;
        prize.Amount = prize.Amount - quantity;

        var newTransaction = new Transaction
        {
            PlayerId = player.Id,
            PrizeId = prize.Id,
            Datetime = DateTime.UtcNow,
            Quantity = quantity
        };

        await DbContext.Transactions.AddAsync(newTransaction);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostTransactionRequest
    {
        public int? playerId { get; set; }
        public int? prizeId { get; set; }
        public int? quantity { get; set; }
    }
}
