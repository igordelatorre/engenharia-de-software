namespace Flipman.Api.Models;

public class Employee
{
    public int id { get; set; }
    public string username { get; set; } = string.Empty;
    public byte[] passwordhash { get; set; } = new byte[] { };
    public byte[] passwordsalt { get; set; } = new byte[] { };
    public string? name { get; set; }
    public bool isadmin { get; set; }
}
