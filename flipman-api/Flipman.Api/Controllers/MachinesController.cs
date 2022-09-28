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

    [HttpPut]
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
}
