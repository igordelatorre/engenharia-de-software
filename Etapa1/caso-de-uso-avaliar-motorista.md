# Avaliar Motorista

**Identificação:** UC2 <br/>

**Caso de Uso:** Avaliação do Motorista <br/>

**Ator:** Passageiro <br/>

**Descrição:** Permite ao passageiro conceder uma avaliação ao motorista de sua viagem. <br/>
**Pré-condições:** A viagem foi confirmada e o tempo de chegada ao destino foi superado. <br />
**Pós-condições:** A quantidade de likes ou dislikes é incrementada. <br/>
## Sequência típica de Eventos 

| Ação do Ator                                    | Resposta do Sistema                                |
|-------------------------------------------------|----------------------------------------------------|
| | 1. Esse Caso de Uso começa após o tempo previsto de chegada da viagem, quando o sistema emite uma solicitação de avaliação                                      |
| 2. O passageiro possui a opção de conceder ao motorista uma, dentre duas, possibilidades de avaliação: positiva ou negativa                                              |                             |
|                                    |  3. O sistema deve aguardar o passageiro avaliar o motorista por um período máximo de 24 horas                                  |
|  | 4. Se o passageiro avaliou a viagem, ver subseção **passageiro avalia viagem**

## Sequência alternativa

3b: Caso o passaegeiro não avalie a viagem, o sistema deve incrementar a quantidade de likes do motorista.

## Subseção passageiro avalia viagem

4a: Em caso de avaliação positiva o sistema deve incrementar a quantidade de likes do motorista.<br/>
4b: Em caso de avaliação negativa o sistema deve incrementar a quantidade de dislikes do motorista.
