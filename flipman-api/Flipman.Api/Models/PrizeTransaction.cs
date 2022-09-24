namespace Flipman.Api.Models;

public class PrizeTransaction
{
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public int PrizeId { get; set; }
    public DateTime Datetime { get; set; }
    public int Quantity { get; set; }
}
