using Flipman.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[Route("prizeSale")]
[ApiController]
public class TransactionsController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }
    public TransactionsController(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    [HttpPost]
    [Route("{id}")]
    public async Task<IActionResult> PostTransaction([FromRoute] int id, [FromBody] PostTransactionRequest request)
    {
        if (request.quantity == null)
        {
            return BadRequest("QUANTITY_CANNOT_BE_NULL");
        }

        var prize = await DbContext.Prizes.Where(prize => prize.id == id).FirstOrDefaultAsync();

        if (prize == null)
        {
            return BadRequest("PRIZE_NOT_FOUND");
        }

        var player = await DbContext.Players.Where(player => player.id == request.playerId).FirstOrDefaultAsync();

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

        var quantity = (int)request.quantity;

        player.tickets = player.tickets - quantity * prize.price;
        prize.amount = prize.amount - quantity;

        var newTransaction = new Transaction
        {
            playerId = player.id,
            prizeId = prize.id,
            datetime = request.datetime,
            quantity = quantity
        };

        await DbContext.Transactions.AddAsync(newTransaction);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostTransactionRequest
    {
        public int? playerId { get; set; }
        public int? prizeId { get; set; }
        public string? datetime { get; set; }
        public int? quantity { get; set; }
    }
}
