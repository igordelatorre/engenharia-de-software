# Avaliar Motorista

**Identificação:** UC3 <br/>

**Caso de Uso:** Avaliação do Motorista <br/>

**Ator:** Passageiro <br/>

**Descrição:** Permite ao passageiro conceder uma avaliação ao motorista de sua viagem. <br/>
**Pré-condições:** A viagem foi confirmada e o tempo de chegada ao destino foi superado. <br />
**Pós-condições:** As métricas do motorista e do passageiro são, possivelmente, atualizadas. <br/>
## Sequência típica de Eventos 

| Ação do Ator                                    | Resposta do Sistema                                |
|-------------------------------------------------|----------------------------------------------------|
| 1. Esse Caso de Uso começa após o tempo previsto de chegada da viagem. |                                      |
| 2. O passageiro possui a opção de conceder ao motorista uma, dentre duas, possibilidades de avaliação positiva ou negativa                                              |                             |
|                                    |  3. O sistema deve aguardar pelas avaliações de ambos motorista e passageiro ou por um período máximo de 24 horas                                   |
|  | 4. Se o passageiro avaliou a viagem, ver subseção **passageiro avalia viagem**


## Subseção passageiro avalia viagem

1a: Em caso de avaliação positiva o sistema deve compensar as métricas de avaliação do motorista.<br/><br/>
1b: Em caso de avaliação negativa o sistema deve descompensar as métricas de avaliação do motorista e, mais sutilmente, as do passageiro.
