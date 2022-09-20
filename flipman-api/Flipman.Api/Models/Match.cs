namespace Flipman.Api.Models;

public class Match
{
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public int MachineId { get; set; }
    public int Points { get; set; }
    public int PlayTime { get; set; }
    public string? Datetime { get; set; }
}
