# Realizar pedido de carona

**Identificação:** UC2

**Caso de Uso:** Realizar pedido de carona

**Ator:** Passageiro

**Descrição:** Permite ao passageiro selecionar uma carona entre as disponíveis no horário desejado e enviar solicitação de vaga no carro. 

**Pré-condições:** O passageiro deve estar autenticado no sistema, o horário da carona deve ser pelo menos 12h depois do horário atual, o passageiro não pode estar com vaga em outra carona no mesmo horário, a carona selecionada deve ter pelo menos uma vaga disponível.

**Pós-condições:** Lançada a solicitação, o pedido fica em estado de "aguardando resposta do motorista", que poderá aceitar ou rejeitar.

## Sequência típica de Eventos 

| Ação do Ator                                    | Resposta do Sistema                                |
|-------------------------------------------------|----------------------------------------------------|
| 1. Esse caso de uso começa com o passageiro abrindo a página de caronas disponíveis. |                                      |
|                                                | 2. O sistema mostra todas as caronas disponíveis.                            |
| 3. O passageiro clica em uma carona dentre as disponíveis. |                                      |
| 4. Após conferir os dados da viagem, o passageiro informa o endereço no qual o motorista deverá buscá-lo. |                                                                                                      |
| 5. O passageiro clica em um botão, solicitando a vaga na carona.
|                                                | 6. O sistema confere se todas as pré-condições estão sendo atendidas.                            |
|                                              | 7. O sistema avisa o passageiro que o pedido foi realizado.               |
|                                              | 8. O sistema notifica o motorista do pedido.               |


## Sequência alternativa

7a: O sistema verifica que alguma das pré-condições não foi atendida. 

1. O sistema cancela a transação, sem enviar a notificação ao motorista.

2. O sistema avisa o passageiro que não foi possível realizar o pedido.
