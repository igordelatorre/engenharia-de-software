# Cadastrar usuário

**Identificação:** UC5

**Caso de Uso:** Cadastrar usuário

**Ator:** Possível "Usuário" do sistema

**Descrição:** Um novo usuário está prestes a se cadastrar no sistema. São necessárias informações pessoais que permitirão, ou não o cadastro do mesmo.

**Pré-condições:** Nenhuma.

**Pós-condições:** Todas as funcionalidades do sistema são disponibilizadas.

## Sequência típica de Eventos 

| Ação do Ator                                    | Resposta do Sistema                                |
|-------------------------------------------------|----------------------------------------------------|
| 1. Esse caso de uso começa com uma pessoa clicando em um botao para entrar na área de cadastro de novos usuários. |
| 2. A pessoa informa suas informações de matrícula: Nome, CPF e Número de matrícula da UFRGS.  |                                                                                                      |
|                                                | 3. O sistema verifica se a pessoa é matriculada na UFRGS e a permite continuar seu cadastro.                             |
| 4. A pesssoa informa o restante de suas informações pessoais: Endereço, Telefone e E-mail.


## Sequência alternativa

3a: O sistema identifica que o ator não é um aluno da UFRGS.

1. O sistema emite uma mensagem, informando o ator de que suas informações de matrícula são inválidas.

2. O sistema volta para o estado da **Ação 2**.