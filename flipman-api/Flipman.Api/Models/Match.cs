namespace Flipman.Api.Models;

public class Match
{
    public int Id { get; set; }
    public string PlayerCard { get; set; } = string.Empty;
    public int MachineId { get; set; }
    public int PlayTime { get; set; }
    public DateTime Datetime { get; set; }
    public int Tickets { get; set; }
}
