# Cadastrar usuário

**Identificação:** UC5

**Caso de Uso:** Cadastrar usuário

**Ator:** Pessoa

**Descrição:** Um novo usuário está prestes a se cadastrar no sistema. São necessárias informações pessoais que permitirão, ou não, o cadastro do mesmo.

**Pré-condições:** Possuir um E-mail com domínio da UFRGS não vinculado a um usuário existente.

**Pós-condições:** Um novo usuário é criado. Todas as funcionalidades do sistema são disponibilizadas.

## Sequência típica de Eventos 

| Ação do Ator                                    | Resposta do Sistema                                |
|-------------------------------------------------|----------------------------------------------------|
| 1. Esse caso de uso começa com uma pessoa clicando em um botao para entrar na área de cadastro de novos usuários. |
| 2. A pessoa informa seu Nome, Telefone, E-mail e Senha |                                                                                                      |
|                                                | 3. O sistema verifica se o E-mail informado possui domínio da UFRGS e cadastra o novo usuário.
|                                                  | 4.   O sistema redireciona o novo usuário para a tela inicial.



## Sequência alternativa

3a: O sistema identifica que a pessoa não possui E-mail com domínio da UFGRS.

1. O sistema emite uma mensagem, informando a pessoa de que suas informações de matrícula são inválidas.

2. O sistema volta para o estado da **Ação 2**.
