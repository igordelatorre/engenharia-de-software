using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Flipman.Api.Authorization;
using Flipman.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Flipman.Api.Controllers;

[ApiController]
public class AuthController : ControllerBase
{
    private FlipmanDbContext DbContext { get; }
    public AuthController(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    [HttpGet]
    [Authorize]
    [Route("me")]
    public async Task<IActionResult> Me()
    {
        var foo = User.FindFirstValue(AppClaims.AdminId);

        return Ok(foo);
    }

    [HttpGet]
    [Route("employees")]
    // [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetEmployees()
    {
        var employees = await DbContext.Employees.ToArrayAsync();

        return Ok(employees);
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterEmployee([FromBody] RegisterEmployeeRequest request)
    {
        if (string.IsNullOrEmpty(request.username) || string.IsNullOrEmpty(request.password))
            return BadRequest("INVALID_INPUT");

        CreatePasswordHash(request.password, out byte[] passwordHash, out byte[] passwordSalt);

        var newEmployee = new Employee
        {
            username = request.username,
            passwordhash = passwordHash,
            passwordsalt = passwordSalt,
            name = request.name,
            isadmin = request.isAdmin ?? false
        };

        await DbContext.Employees.AddAsync(newEmployee);
        await DbContext.SaveChangesAsync();

        return Ok(newEmployee);
    }

    public class RegisterEmployeeRequest
    {
        public string? username { get; set; }
        public string? password { get; set; }
        public string? name { get; set; }
        public bool? isAdmin { get; set; }
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.username) || string.IsNullOrEmpty(request.password))
            return BadRequest("INVALID_INPUT");

        var employee = await DbContext.Employees.Where(e => e.username == request.username).FirstOrDefaultAsync();

        if (employee == null)
        {
            return BadRequest("EMPLOYEE_NOT_FOUND");
        }

        if (!VerifyPasswordHash(request.password, employee.passwordhash, employee.passwordsalt))
        {
            return BadRequest();
        }

        var token = CreateToken(employee);

        return Ok(token);
    }

    public class LoginRequest
    {
        public string? username { get; set; }
        public string? password { get; set; }
    }


    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
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
            new Claim(ClaimTypes.Name, employee.username),
            new Claim(AppClaims.AdminId, employee.id.ToString())
        };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("foobarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"));

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
