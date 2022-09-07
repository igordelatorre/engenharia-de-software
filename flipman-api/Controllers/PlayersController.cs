using Flipman.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[Route("players")]
[ApiController]
public class PlayersController : ControllerBase
{
    private FlipmanDbContext DbContext {get;}
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
        var player = await DbContext.Players.Where(player => player.id == id).FirstOrDefaultAsync();

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

        var isCardAlreadyInUse = await DbContext.Players.Where(player => player.card == request.card).FirstOrDefaultAsync() != null;

        if (isCardAlreadyInUse)
        {
            return BadRequest("CARD_ALREADY_IN_USE");
        }

        var newPlayer = new Player 
        {
            card = (int)request.card,
            name = request.name,
            email = request.email,
            cellphone = request.cellphone,
            tokens = request.tokens,
            tickets = request.tickets,
            isActive = request.isActive
        };

        await DbContext.Players.AddAsync(newPlayer);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostPlayerRequest 
    {
        public int? card {get; set;}
        public string? name {get; set;}
        public string? email {get; set;}
        public string? cellphone {get; set;}
        public int? tokens {get; set;}
        public int? tickets {get; set;}
        public bool? isActive {get; set;}
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> UpdatePlayer([FromRoute] int id, [FromBody] PutPlayerRequest request)
    {
        if (request.name == null)
        {
            return BadRequest("NAME_CANNOT_BE_NULL");
        }

        var player = await DbContext.Players.Where(player => player.id == id).FirstOrDefaultAsync();

        if (player == null)
        {
            return BadRequest("PLAYER_NOT_FOUND");
        }

        player.name = request.name;
        player.cellphone = request.cellphone;
        player.email = request.email;
        player.tokens = request.tokens;
        player.tickets = request.tickets;
        player.isActive = request.isActive;

        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PutPlayerRequest
    {
        public string? name {get; set;}
        public string? email {get; set;}
        public string? cellphone {get; set;}
        public int? tokens {get; set;}
        public int? tickets {get; set;}
        public bool? isActive {get; set;}
    }
}
