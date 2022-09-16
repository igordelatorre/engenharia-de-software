using Flipman.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[Route("players")]
[ApiController]
public class PlayersController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }
    public PlayersController(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetPlayers()
    {
        var players = await DbContext.Players.ToArrayAsync();

        return Ok(players);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetPlayer([FromRoute] int id)
    {
        var player = await DbContext.Players.Where(player => player.Id == id).FirstOrDefaultAsync();

        if (player == null)
        {
            return NoContent();
        }

        return Ok(player);
    }

    [HttpPost]
    public async Task<IActionResult> PostPlayer([FromBody] PostPlayerRequest request)
    {
        if (request.name == null || request.card == null)
        {
            return BadRequest();
        }

        var isCardAlreadyInUse = await DbContext.Players.Where(player => player.Card == request.card).FirstOrDefaultAsync() != null;

        if (isCardAlreadyInUse)
        {
            return BadRequest("CARD_ALREADY_IN_USE");
        }

        var newPlayer = new Player
        {
            Card = (int)request.card,
            Name = request.name,
            Email = request.email,
            Cellphone = request.cellphone,
            Tokens = request.tokens ?? 0,
            Tickets = 0,
            IsActive = true,
        };

        await DbContext.Players.AddAsync(newPlayer);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostPlayerRequest
    {
        public int? card { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? cellphone { get; set; }
        public int? tokens { get; set; }
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> UpdatePlayer([FromRoute] int id, [FromBody] PutPlayerRequest request)
    {
        if (request.name == null)
        {
            return BadRequest("NAME_CANNOT_BE_NULL");
        }

        var player = await DbContext.Players.Where(player => player.Id == id).FirstOrDefaultAsync();

        if (player == null)
        {
            return BadRequest("PLAYER_NOT_FOUND");
        }

        player.Name = request.name;
        player.Cellphone = request.cellphone;
        player.Email = request.email;
        player.Tokens = request.tokens ?? player.Tokens;
        player.Tickets = request.tickets ?? player.Tickets;
        player.IsActive = request.isActive ?? player.IsActive;

        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PutPlayerRequest
    {
        public string? name { get; set; }
        public string? email { get; set; }
        public string? cellphone { get; set; }
        public int? tokens { get; set; }
        public int? tickets { get; set; }
        public bool? isActive { get; set; }
    }
}
