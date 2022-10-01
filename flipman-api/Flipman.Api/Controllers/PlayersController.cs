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
    public async Task<IActionResult> GetPlayers()
    {
        var players = await DbContext.Players.ToArrayAsync();

        List<PlayerResponseElement> playerResponse = new List<PlayerResponseElement>();

        foreach (var player in players)
        {
            var playerStats = await DbContext.Matches.Where(m => m.PlayerCard == player.Card).ToArrayAsync();

            playerResponse.Add(new PlayerResponseElement(
                    player,
                    playerStats.Sum(p => p.PlayTime) / 60.0,
                    playerStats.Sum(p => p.Tickets)
                )
            );
        }

        return Ok(playerResponse);
    }

    public record PlayerResponseElement(Player Player, double HoursPlayed, int TicketsEarned);


    [HttpGet]
    [Route("player-info/{playerCard}")]
    public async Task<IActionResult> GetPlayerInfo([FromRoute] string playerCard)
    {
        var player = await DbContext.Players.Where(player => player.Card == playerCard && player.IsActive).FirstOrDefaultAsync();

        if (player == null)
        {
            return BadRequest("PLAYER_NOT_FOUND");
        }

        var gameStats = await DbContext.Matches.Where(match => match.PlayerCard == player.Card)
            .GroupBy(match => match.MachineId)
            .Select(match => new PlayerGameStats(match.Key, (double)match.Sum(m => m.PlayTime) / 60.0))
            .ToArrayAsync();

        return Ok(new PlayerInfo(player.Name ?? "---", player.Tickets, player.Tokens, gameStats));
    }

    public record PlayerGameStats(int machineId, double hoursPlayed);
    public record PlayerInfo(string Name, int Tickets, int Tokens, PlayerGameStats[] GameStats);

    [HttpPost]
    [Route("player")]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> PostPlayer([FromBody] PostPlayerRequest request)
    {
        if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Card))
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

        var newPlayer = new Player(request.Card, request.Name, request.Username, request.Email, request.Cellphone);

        await DbContext.Players.AddAsync(newPlayer);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostPlayerRequest
    {
        public string? Card { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Cellphone { get; set; }
    }

    [HttpGet]
    [Route("player-tickets/{playerCard}")]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> GetPlayerAllTickets([FromRoute] string playerCard)
    {
        var player = await DbContext.Players.Where(player => player.Card == playerCard && player.IsActive).FirstOrDefaultAsync();

        if (player == null)
        {
            return BadRequest("PLAYER_NOT_FOUND");
        }

        var allTimeTickets = await DbContext.Matches
            .Where(match => match.PlayerCard == playerCard)
            .SumAsync(match => match.Tickets);

        return Ok(new { Name = player.Name, tickets = allTimeTickets });
    }

    [HttpGet]
    [Route("players-report")]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> GetPlayersReport()
    {
        var activePlayers = await DbContext.Players.Where(player => player.IsActive).ToListAsync();

        List<PlayerReport> playersReport = new List<PlayerReport>();

        foreach (var player in activePlayers)
        {
            var hoursPlayed = await DbContext.Matches
                .Where(match => match.PlayerCard == player.Card)
                .SumAsync(match => match.PlayTime) / 60.0;

            playersReport.Add(new PlayerReport(player.Name ?? "---", player.Card, hoursPlayed));
        }

        return Ok(playersReport);
    }

    public record PlayerReport(string playerName, string playerCard, double hoursPlayed);

    [HttpPost]
    [Route("player-tokens/{playerCard}")]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> PostPlayerTokens([FromRoute] string playerCard, [FromBody] PostPlayerTokensRequest request)
    {
        if (request.Tokens == null)
            return BadRequest();

        var player = await DbContext.Players.Where(player => player.Card == playerCard && player.IsActive).FirstOrDefaultAsync();

        if (player == null)
        {
            return BadRequest("PLAYER_NOT_FOUND");
        }

        player.Tokens += (int)request.Tokens;
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostPlayerTokensRequest
    {
        public int? Tokens { get; set; }
    }
}
