namespace Flipman.Api.Models;

public class Player
{
    public int Card { get; set; }
    public string? Name { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public int Tokens { get; set; }
    public int Tickets { get; set; }
    public bool IsActive { get; set; }
    public string? Cellphone { get; set; }

    public Player(int card, string name, string username, string email, string? cellphone)
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
