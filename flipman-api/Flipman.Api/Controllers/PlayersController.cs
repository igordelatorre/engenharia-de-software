using Flipman.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[ApiController]
public class PlayersController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }
    public PlayersController(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    [HttpGet]
    [Route("players")]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> GetPlayers()
    {
        var players = await DbContext.Players.ToArrayAsync();

        return Ok(players);
    }

    [HttpGet]
    [Route("player/{playerCard}")]
    public async Task<IActionResult> GetPlayer([FromRoute] int playerCard)
    {
        var player = await DbContext.Players.Where(player => player.Card == playerCard).FirstOrDefaultAsync();

        if (player == null)
        {
            return BadRequest("PLAYER_NOT_FOUND");
        }

        var hoursPlayedByMachine = await DbContext.Matches.Where(match => match.PlayerCard == player.Card)
            .GroupBy(match => match.MachineId)
            .Select(match => new { machineId = match.Key, hoursPlayed = match.Sum(m => m.PlayTime) })
            .ToArrayAsync();

        return Ok(new { tickets = player.Tickets, tokens = player.Tokens, hoursPlayedByMachine });
    }

    [HttpPost]
    [Route("player")]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> PostPlayer([FromBody] PostPlayerRequest request)
    {
        if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Email) || request.Card == null)
            return BadRequest();

        var isCardAlreadyInUse = await DbContext.Players.Where(player => player.Card == request.Card).FirstOrDefaultAsync() != null;

        if (isCardAlreadyInUse)
        {
            return BadRequest("CARD_ALREADY_IN_USE");
        }

        var isUserNameAlreadyInUse = await DbContext.Players.Where(player => player.Username == request.Username).FirstOrDefaultAsync() != null;

        if (isUserNameAlreadyInUse)
        {
            return BadRequest("USERNAME_ALREADY_IN_USE");
        }

        var newPlayer = new Player((int)request.Card, request.Name, request.Username, request.Email, request.Cellphone);

        await DbContext.Players.AddAsync(newPlayer);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostPlayerRequest
    {
        public int? Card { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Cellphone { get; set; }
    }

    [HttpPut]
    [Route("player/{playerCard}")]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> UpdatePlayer([FromRoute] int playerCard, [FromBody] PutPlayerRequest request)
    {
        if (request.name == null)
        {
            return BadRequest("NAME_CANNOT_BE_NULL");
        }

        var player = await DbContext.Players.Where(player => player.Card == playerCard).FirstOrDefaultAsync();

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
