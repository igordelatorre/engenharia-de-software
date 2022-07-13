# Aceitar pedido de carona

**Identificação:** UC1

**Caso de Uso:** Aceitar pedido de carona

**Ator:** Motorista

**Descrição:** Permite ao motorista aceitar um pedido de carona solicitado por um passageiro. Após aceitar, a quantidade de vagas no veículo é atualizada e uma notificação é enviada ao passageiro.

**Pré-condições:** Um passsageiro deve ter solicitado uma carona. O motorista deve estar autenticado no sistema.

**Pós-condições:** Lançada a transação é atualizado a quantidade de vagas no veículo. O passageiro é incluído na viagem.

## Sequência típica de Eventos 

| Ação do Ator                                    | Resposta do Sistema                                |
|-------------------------------------------------|----------------------------------------------------|
|                                       | 1. Esse caso de uso começa com o sistema notificando o motorista que um passageiro solicitou vaga em seu veículo. |
| 2. O motorista aceita a solicitação do passageiro. |                                                                                                      |
|                                                | 3. O sistema atualiza o número de vagas disponíveis no veículo do motorista.                             |
|                                              | 4. O sistema inclui o passageiro na viagem e envia uma notificação ao passageiro, informando que sua solicitação foi aceita.               |


## Sequência alternativa

2a: O motorista rejeita a solicitação do passageiro.

1. O sistema retira a solicitação de carona do passageiro.

2. O sistema notifica o passageiro que o motorista rejeitou sua solicitação.

