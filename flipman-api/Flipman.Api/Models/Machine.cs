namespace Flipman.Api.Models;

public class Machine
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int PlayCost { get; set; }
    public bool IsActive { get; set; }

    public Machine(string name, int playCost)
    {
        Name = name;
        PlayCost = playCost;
        IsActive = true;
    }
}
