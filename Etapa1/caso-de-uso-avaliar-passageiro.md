# Avaliar Passageiros

**Identificação:** UC4 <br/>

**Caso de Uso:** Avaliar Passageiros <br/>

**Ator:** Motorista<br/>

**Descrição:** Permite ao motorista conceder uma avaliação aos passageiros de sua viagem. <br/>
**Pré-condições:** A viagem foi confirmada e o tempo de chegada ao destino foi superado. <br />
**Pós-condições:** As métricas dos passageiros e do motorista são, possivelmente, atualizadas. <br/>
## Sequência típica de Eventos 

| Ação do Ator                                    | Resposta do Sistema                                |
|-------------------------------------------------|----------------------------------------------------|
| 1. Esse Caso de Uso começa após o tempo previsto de chegada da viagem. |                                      |
| 2a. O motorista tem a opção de conceder invidualmente aos passageiros uma, dentre duas, possibilidades de avaliação positiva ou negativa.                                              |                             |
| 2b. O motorista tem a opção de avaliar a viagem como positiva, a consequência dessa ação é equivalente a avaliar todos os passageiros positivamente                                              |                             |
|                                    |  3. O sistema deve aguardar pelas avaliações de ambos motorista e passageiros ou por um período máximo de 24 horas                                   |
|  | 4. Se o motorista avaliou os passageiros, ver subseção **motorista avalia passageiros**


## Subseção motorista avalia passageiros
1: O sistema deve verificar cada uma das avaliações de cada passageiro. <br/>
2a: Em caso de avaliação positiva o sistema deve compensar as métricas de avaliação do passageiro em questão.<br/>
2b: Em caso de avaliação negativa o sistema deve descompensar as métricas de avaliação do passageiro em questão e, mais sutilmente, as do motorista também.
