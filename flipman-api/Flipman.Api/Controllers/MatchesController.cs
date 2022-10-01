using Flipman.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[ApiController]
public class MatchesController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }

    public MatchesController(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    [HttpPost]
    [Route("match")]
    public async Task<IActionResult> PostMatch([FromBody] PostMatchRequest request)
    {
        if (
            request.PlayerCard == null ||
            request.MachineId == null ||
            request.PlayTime == null ||
            request.Tickets == null
          )
        {
            return BadRequest();
        }

        var player = await DbContext.Players.Where(player => player.Card == request.PlayerCard).FirstOrDefaultAsync();

        if (player == null)
            return BadRequest("PLAYER_NOT_FOUND");

        var machine = await DbContext.Machines.Where(machine => machine.Id == request.MachineId).FirstOrDefaultAsync();

        if (machine == null)
            return BadRequest("MACHINE_NOT_FOUND");

        if (machine.PlayCost > player.Tokens)
            return BadRequest("INSUFFICIENT_TOKENS");

        var newMatch = new Match
        {
            PlayerCard = (int)request.PlayerCard,
            MachineId = (int)request.MachineId,
            Tickets = (int)request.Tickets,
            PlayTime = (int)request.PlayTime,
            Datetime = System.DateTime.UtcNow
        };

        await DbContext.Matches.AddAsync(newMatch);

        player.Tokens -= machine.PlayCost;
        player.Tickets += (int)request.Tickets;

        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostMatchRequest
    {
        public int? PlayerCard { get; set; }
        public int? MachineId { get; set; }
        public int? PlayTime { get; set; }
        public int? Tickets { get; set; }
    }
}
