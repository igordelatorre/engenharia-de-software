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
        if (request.name == null || request.id == null)
        {
            return BadRequest();
        }

        var isIdAlreadyInUse = await DbContext.Players.Where(player => player.id == request.id).FirstOrDefaultAsync() != null;

        if (isIdAlreadyInUse)
        {
            return BadRequest("ID_ALREADY_IN_USE");
        }

        var newPlayer = new Player 
        {
            id = (int)request.id,
            name = request.name
        };

        await DbContext.Players.AddAsync(newPlayer);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostPlayerRequest 
    {
        public int? id {get; set;}
        public string? name {get; set;}
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

        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PutPlayerRequest
    {
        public string? name {get; set;}
    }
}
