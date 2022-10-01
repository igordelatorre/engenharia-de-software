namespace Flipman.Api.Models;

public class Player
{
    public string Card { get; set; } = string.Empty;
    public string? Name { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public int Tokens { get; set; }
    public int Tickets { get; set; }
    public bool IsActive { get; set; }
    public string? Cellphone { get; set; }

    public Player(string card, string name, string username, string email, string? cellphone)
    {
        Card = card;
        Username = username;
        Name = name;
        Email = email;
        Cellphone = cellphone;
        Tokens = 0;
        Tickets = 0;
        IsActive = true;
    }
}
