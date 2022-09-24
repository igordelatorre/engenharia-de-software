namespace Flipman.Api.Models;

public class Match
{
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public int MachineId { get; set; }
    public int Points { get; set; }
    public int PlayTime { get; set; }
    public DateTime Datetime { get; set; }
    public int Tokens { get; set; }
    public int Tickets { get; set; }
}
