# Realizar solicitação de carona

**Identificação:** UC5

**Caso de Uso:** Realizar solicitação de carona

**Ator:** Passageiro

**Descrição:** Permite ao passageiro selecionar uma carona entre as disponíveis e enviar solicitação de vaga na viagem. 

**Pré-condições:** O passageiro deve estar autenticado no sistema, com uma viagem selecionada. O horário da solicitação deve ser antes do horário da carona. O passageiro não pode estar com vaga em outra carona no mesmo horário. A viagem selecionada deve ter pelo menos uma vaga disponível.

**Pós-condições:** Lançada a solicitação, o pedido fica em estado de "aguardando resposta do motorista", que poderá aceitar ou rejeitar.

## Sequência típica de Eventos 

| Ação do Ator                                    | Resposta do Sistema                                |
|-------------------------------------------------|----------------------------------------------------|
|                                     |
| 1. O passageiro clica em um botão, solicitando a vaga na viagem. |                                                                                                      |
| 2. O passageiro informa seu endereço de saída.
|                                                | 3. O sistema confere se todas as pré-condições estão sendo atendidas.                            |
|                                              | 4. O sistema avisa o passageiro que o pedido foi realizado.               |
|                                              | 5. O sistema notifica o motorista do pedido.               |


## Sequência alternativa

3a: O sistema verifica que alguma das pré-condições não foi atendida. 

1. O sistema cancela a transação, sem enviar a solicitação ao motorista.

2. O sistema avisa o passageiro que não foi possível realizar a solicitação.
