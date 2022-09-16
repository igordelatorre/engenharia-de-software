namespace Flipman.Api.Models;

public class Employee
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public byte[] PasswordHash { get; set; } = new byte[] { };
    public byte[] PasswordSalt { get; set; } = new byte[] { };
    public string? Name { get; set; }
    public bool IsAdmin { get; set; }
}
