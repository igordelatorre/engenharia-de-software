using Flipman.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[Route("matches")]
[ApiController]
public class MatchesController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }

    public MatchesController(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetMatches()
    {
        var matches = await DbContext.Matches.ToArrayAsync();

        return Ok(matches);
    }

    [HttpGet]
    [Route("{id}/machine")]
    public async Task<IActionResult> GetMatchesByMachine([FromRoute] int id)
    {
        var match = await DbContext.Matches.Where(match => match.MachineId == id).FirstOrDefaultAsync();

        if (match == null)
        {
            return BadRequest("MATCH_NOT_FOUND");
        }

        return Ok(match);
    }

    [HttpGet]
    [Route("{id}/player")]
    public async Task<IActionResult> GetMatchesByPlayer([FromRoute] int id)
    {
        var match = await DbContext.Matches.Where(match => match.PlayerId == id).FirstOrDefaultAsync();

        if (match == null)
        {
            return BadRequest("MATCH_NOT_FOUND");
        }

        return Ok(match);
    }

    [HttpPost]
    public async Task<IActionResult> PostMatch([FromBody] PostMatchRequest request)
    {
        if (
            request.PlayerId == null ||
            request.MachineId == null ||
            request.Points == null ||
            request.PlayTime == null ||
            request.Tokens == null ||
            request.Tickets == null
          )
        {
            return BadRequest();
        }

        var player = await DbContext.Players.Where(player => player.Id == request.PlayerId).FirstOrDefaultAsync();

        if (player == null)
            return BadRequest();


        var newMatch = new Match
        {
            PlayerId = (int)request.PlayerId,
            MachineId = (int)request.MachineId,
            Points = (int)request.Points,
            PlayTime = (int)request.PlayTime,
            Datetime = System.DateTime.UtcNow
        };

        await DbContext.Matches.AddAsync(newMatch);

        player.Tokens -= (int)request.Tokens;
        player.Tickets += (int)request.Tickets;

        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostMatchRequest
    {
        public int? PlayerId { get; set; }
        public int? MachineId { get; set; }
        public int? Points { get; set; }
        public int? PlayTime { get; set; }
        public int? Tokens { get; set; }
        public int? Tickets { get; set; }
    }
}
