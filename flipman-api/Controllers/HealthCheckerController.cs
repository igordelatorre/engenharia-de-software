using Microsoft.AspNetCore.Mvc;

namespace Flipman.Api.Controllers;

public class HealthCheckerController : ControllerBase
{
    [HttpGet]
    [Route("health")]
    public IActionResult GetHealth()
    {
        return Ok("OK");
    }
}
