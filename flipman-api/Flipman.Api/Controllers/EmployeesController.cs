using System.Security.Cryptography;
using Flipman.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flipman.Api.Controllers;

[Route("employees")]
[ApiController]
public class EmployeesControlLer : ControllerBase
{
    private FlipmanDbContext DbContext { get; }
    public EmployeesControlLer(FlipmanDbContext dbContext)
    {
        DbContext = dbContext;
    }

    [HttpGet]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> GetEmployees()
    {
        var employees = await DbContext.Employees
            .Select(e => new GetEmployeeResponseElement(e.Id, e.Username, e.Name, e.IsAdmin))
            .ToArrayAsync();

        return Ok(employees);
    }

    public record GetEmployeeResponseElement(long Id, string Username, string? Name, bool IsAdmin);

    [HttpGet]
    [Route("{id}")]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> GetEmployee(int id)
    {
        var employee = await DbContext.Employees.Where(e => e.Id == id).FirstOrDefaultAsync();

        if (employee == null)
        {
            return BadRequest("EMPLOYEE_NOT_FOUND");
        }

        return Ok(new GetEmployeeResponseElement(employee.Id, employee.Username, employee.Name, employee.IsAdmin));
    }

    [HttpPost]
    [Route("register")]
    [Authorize(policy: "Manager")]
    public async Task<IActionResult> RegisterEmployee([FromBody] RegisterEmployeeRequest request)
    {
        if (string.IsNullOrEmpty(request.username) || string.IsNullOrEmpty(request.password))
            return BadRequest("INVALID_INPUT");

        CreatePasswordHash(request.password, out byte[] passwordHash, out byte[] passwordSalt);

        var newEmployee = new Employee
        {
            Username = request.username,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            Name = request.name,
            IsAdmin = request.isAdmin ?? false
        };

        await DbContext.Employees.AddAsync(newEmployee);
        await DbContext.SaveChangesAsync();

        return Ok();
    }

    public class RegisterEmployeeRequest
    {
        public string? username { get; set; }
        public string? password { get; set; }
        public string? name { get; set; }
        public bool? isAdmin { get; set; }
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }
}
