namespace Flipman.Api.Models;

public class Player
{
    public int id {get; set;}
    public int card {get; set;}
    public string? name { get; set; }
    public string? email { get; set; }
    public string? cellphone { get; set; }
    public int tokens {get; set;}
    public int tickets {get; set;}
    public bool isActive {get; set;}
}
