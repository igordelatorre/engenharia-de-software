# engenharia-de-software

# Documentação

Tudo vai ter IDs únicos

## Jogadores
```
- card (string de números)
- name
- email
- cellphone (opcional)
- tokens (int)
- tickets (int)
```

## Máquinas
```
- name
- playCost (int)
- pointsPerTicket (int)
```

## Partidas
```
- playerId
- machineId
- tickets
- playTime (int em segundos)
```

## Prêmios
```
- name
- amount (int)
- price (int)
```

## PrizeTransaction
```
- playerId
- prizeId
- amount (int)
- dateTime 
```

## TicketTransaction
```
- playerId
- machineId 
- amount (int)
- dateTime
```


