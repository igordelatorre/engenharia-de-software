using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Flipman.Api.Authorization;
using Flipman.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Flipman.Api.Controllers;

[ApiController]
public class AuthController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }
    private IConfiguration Configuration { get; }

    public AuthController(FlipmanDbContext dbContext, IConfiguration configuration)
    {
        DbContext = dbContext;
        Configuration = configuration;
    }

    [HttpPost]
    [Route("login/employee")]
    public async Task<IActionResult> EmployeeLogin([FromBody] EmployeeLoginRequest request)
    {
        if (string.IsNullOrEmpty(request.username) || string.IsNullOrEmpty(request.password))
            return BadRequest("INVALID_INPUT");

        var employee = await DbContext.Employees.Where(e => e.Username == request.username).FirstOrDefaultAsync();

        if (employee == null)
        {
            return BadRequest("EMPLOYEE_NOT_FOUND");
        }

        if (!VerifyPasswordHash(request.password, employee.PasswordHash, employee.PasswordSalt))
        {
            return BadRequest();
        }

        var token = CreateToken(employee);

        return Ok(token);
    }

    public class EmployeeLoginRequest
    {
        public string? username { get; set; }
        public string? password { get; set; }
    }

    [HttpPost]
    [Route("login/player")]
    public async Task<IActionResult> PlayerLogin([FromBody] PlayerLoginRequest request)
    {
        if (request.card == null)
            return BadRequest("INVALID_INPUT");

        var player = await DbContext.Players.Where(p => p.Card == request.card).FirstOrDefaultAsync();

        if (player == null)
        {
            return BadRequest();
        }

        var token = CreateToken(player);

        return Ok();
    }

    public class PlayerLoginRequest
    {
        public long? card;
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512(passwordSalt))
        {
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
    }

    private string CreateToken(Employee employee)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, employee.Username),
            new Claim(employee.IsAdmin ? AppClaims.ManagerId : AppClaims.EmployeeId, employee.Id.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("AppSettings:Token").Value));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }

    private string CreateToken(Player player)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(AppClaims.PlayerId, player.Card.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("AppSettings:Token").Value));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}
