using Flipman.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[Route("Matches")]
[ApiController]
public class MatchesController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }

    public MatchesController(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    [HttpGet]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> GetMatches()
    {
        var matches = await DbContext.Matches.ToArrayAsync();

        return Ok(matches);
    }

    [HttpGet]
    [Route("{id]")]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> GetMatch([FromRoute] int id)
    {
        var match = await DbContext.Matches.Where(match => match.Id == id).FirstOrDefaultAsync();

        if (match == null)
        {
            return BadRequest("MATCH_NOT_FOUND");
        }

        return Ok(match);
    }

    [HttpPost]
    [Authorize(policy: "Employee")]
    public async Task<IActionResult> PostMatch([FromBody] PostMatchRequest request)
    {
        if (request.PlayerId == null || 
            request.MachineId == null || 
            request.Points == null ||
            request.PlayTime == null || 
            request.Datetime == null ||
            request.Tokens == null ||
            request.Tickets == null
            )
        {
            return BadRequest();
        }

        var newMatch = new Match
        {
            PlayerId = (int)request.PlayerId,
            MachineId = (int)request.MachineId,
            Points = (int)request.Points,
            PlayTime = (int)request.PlayTime,
            Datetime = System.DateTime.UtcNow
        };

        await DbContext.Matches.AddAsync(newMatch);
        await DbContext.SaveChangesAsync();

        var player = await DbContext.Players.Where(player => player.id == request.PlayerId);

        player.Tokens -= request.Tokens;
        player.Tickets += request.Tickets;
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostMatchRequest
    {
        public int? PlayerId { get; set; }
        public int? MachineId { get; set; }
        public int? Points { get; set; }
        public int? PlayTime { get; set; }
        public DateTime? Datetime { get; set; }
        public int? Tokens { get; set; }
        public int? Tickets { get; set; }
    }
}