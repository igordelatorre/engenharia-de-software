namespace Flipman.Api.Models;

public class Player
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public int Card { get; set; }
    public int Tokens { get; set; }
    public int Tickets { get; set; }
    public bool IsActive { get; set; }
    public string? Cellphone { get; set; }
}