namespace Flipman.Api.Models;

public class PrizeTransaction
{
    public int Id { get; set; }
    public string PlayerCard { get; set; } = string.Empty;
    public int PrizeId { get; set; }
    public DateTime Datetime { get; set; }
    public int Quantity { get; set; }
}
