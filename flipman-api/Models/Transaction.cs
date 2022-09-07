namespace Flipman.Api.Models;

public class Transaction
{
  public int id {get; set;}
  public int playerId {get; set;}
  public int prizeId {get; set;}
  public string? datetime {get; set;}
  public int quantity {get; set;}
}
