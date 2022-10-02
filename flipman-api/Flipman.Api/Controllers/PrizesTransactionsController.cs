using Flipman.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[ApiController]
public class PrizesTransactionsController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }
    public PrizesTransactionsController(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    [HttpGet]
    [Route("prizes-transactions")]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> GetPrizeTransactions()
    {
        var transactions = await DbContext.PrizeTransactions.ToArrayAsync();

        return Ok(transactions);
    }

    [HttpGet]
    [Route("prizes-transactions/{prizeId}")]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> GetPrizeTransactionByPrize([FromRoute] int prizeId)
    {
        var prizeTransactions = await DbContext.PrizeTransactions.Where(transaction => transaction.PrizeId == prizeId).ToArrayAsync();

        return Ok(prizeTransactions);
    }

    [HttpPost]
    [Route("prize-transaction")]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> PostTransaction([FromBody] PostTransactionRequest request)
    {
        if (request.PlayerCard == null || request.PrizeId == null || request.Quantity == null)
            return BadRequest();


        var prize = await DbContext.Prizes.Where(prize => prize.Id == request.PrizeId).FirstOrDefaultAsync();

        if (prize == null)
        {
            return BadRequest("PRIZE_NOT_FOUND");
        }

        var player = await DbContext.Players.Where(player => player.Card == request.PlayerCard).FirstOrDefaultAsync();

        if (player == null)
        {
            return BadRequest("PLAYER_NOT_FOUND");
        }

        if (request.Quantity > prize.Amount)
        {
            return BadRequest("QUANTITY_MUST_BE_LESS_THAN_PRIZE_AMOUNT");
        }

        if (player.Tickets < request.Quantity * prize.Price)
        {
            return BadRequest("NOT_ENOUGH_TICKETS");
        }

        player.Tickets = player.Tickets - (int)request.Quantity * prize.Price;
        prize.Amount = prize.Amount - (int)request.Quantity;

        var newTransaction = new PrizeTransaction
        {
            PlayerCard = player.Card,
            PrizeId = prize.Id,
            Datetime = DateTime.UtcNow,
            Quantity = (int)request.Quantity
        };

        await DbContext.PrizeTransactions.AddAsync(newTransaction);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostTransactionRequest
    {
        public string? PlayerCard { get; set; }
        public int? PrizeId { get; set; }
        public int? Quantity { get; set; }
    }
}
