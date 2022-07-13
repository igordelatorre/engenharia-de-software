# Avaliar Passageiro

**Identificação:** UC3 <br/>

**Caso de Uso:** Avaliação do Passageiro <br/>

**Ator:** MMotorista <br/>

**Descrição:** Permite ao motorista conceder uma avaliação ao passageiro de sua viagem. <br/>
**Pré-condições:** A viagem foi confirmada e o tempo de chegada ao destino foi superado. <br />
**Pós-condições:** A quantidade de likes ou dislikes do passageiro é incrementada. <br/>
## Sequência típica de Eventos 

| Ação do Ator                                    | Resposta do Sistema                                |
|-------------------------------------------------|----------------------------------------------------|
| | 1. Esse Caso de Uso começa após o tempo previsto de chegada da viagem, quando o sistema emite uma solicitação de avaliação                                      |
| 2. O motorista possui a opção de conceder ao passageiro uma, dentre duas, possibilidades de avaliação: positiva ou negativa                                              |                             |
|                                    |  3. O sistema deve aguardar o motorista avaliar o passageiro por um período máximo de 24 horas                                   |
|  | 4. Se o motorista avaliou a viagem, ver subseção **motorista avalia viagem**

## Sequência alternativa

3b: Caso o motorista não avalie a viagem, o sistema deve incrementar a quantidade de likes do passageiro.

## Subseção motorista avalia viagem

4a: Em caso de avaliação positiva o sistema deve incrementar a quantidade de likes do passageiro.<br/>
4b: Em caso de avaliação negativa o sistema deve incrementar a quantidade de dislikes do passageiro.
