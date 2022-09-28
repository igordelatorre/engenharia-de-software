using Flipman.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[ApiController]
public class MachinesController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }

    public MachinesController(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    [HttpPost]
    [Route("machine")]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> PostMachine([FromBody] PostMachineRequest request)
    {
        if (string.IsNullOrEmpty(request.Name) || request.PlayCost == null)
            return BadRequest();

        var isMachineNameAlreadyInUse = await DbContext.Machines
            .Where(machine => machine.Name == request.Name && machine.IsActive).FirstOrDefaultAsync() != null;

        if (isMachineNameAlreadyInUse)
        {
            return BadRequest("NAME_ALREADY_IN_USE");
        }

        var newMachine = new Machine(request.Name, (int)request.PlayCost);

        await DbContext.Machines.AddAsync(newMachine);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PostMachineRequest
    {
        public string? Name { get; set; }
        public int? PlayCost { get; set; }
    }

    [HttpDelete]
    [Route("machine/{machineId}")]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> DeleteMachine([FromRoute] int machineId)
    {
        var machine = await DbContext.Machines.Where(machine => machine.Id == machineId).FirstOrDefaultAsync();

        if (machine == null)
        {
            return BadRequest("MACHINE_NOT_FOUND");
        }

        machine.IsActive = false;
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPut]
    [Route("machine/{machineId}")]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> PutMachine([FromRoute] int machineId, [FromBody] PutMachineRequest request)
    {
        if (string.IsNullOrEmpty(request.Name) || request.PlayCost == null || request.IsActive == null)
            return BadRequest();

        var machine = await DbContext.Machines.Where(machine => machine.Id == machineId).FirstOrDefaultAsync();

        if (machine == null)
        {
            return BadRequest("MACHINE_NOT_FOUND");
        }

        var isMachineNameAlreadyInUse = await DbContext.Machines
            .Where(machine => machine.Name == request.Name && machine.IsActive).FirstOrDefaultAsync() != null;

        if (isMachineNameAlreadyInUse)
        {
            return BadRequest("NAME_ALREADY_IN_USE");
        }

        machine.Name = request.Name;
        machine.PlayCost = (int)request.PlayCost;
        machine.IsActive = (bool)request.IsActive;

        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class PutMachineRequest
    {
        public string? Name { get; set; }
        public int? PlayCost { get; set; }
        public bool? IsActive { get; set; }
    }

    [HttpGet]
    [Route("machines")]
    public async Task<IActionResult> GetMachines()
    {
        var machines = await DbContext.Machines.ToArrayAsync();

        return Ok(machines);
    }

    [HttpGet]
    [Route("machine/{machineId}")]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> GetMachineStats([FromRoute] int machineId)
    {
        var machine = await DbContext.Machines.Where(machine => machine.Id == machineId && machine.IsActive).FirstOrDefaultAsync();

        if (machine == null)
        {
            return BadRequest("MACHINE_NOT_FOUND");
        }

        float hoursPlayed = await DbContext.Matches.Where(match => match.MachineId == machine.Id).SumAsync(match => match.PlayTime) / 60.0f;

        var machineStats = await DbContext.Matches.Where(match => match.MachineId == machine.Id)
            .GroupBy(match => true)
            .Select(match => new MachineStats(match.Sum(m => m.PlayTime) / 60.0, match.Sum(m => m.Tickets)))
            .FirstOrDefaultAsync();

        return Ok(machineStats ?? new MachineStats(0, 0));
    }

    public record MachineStats(double hours, int tickets);

}
