# Como rodar o banco localmente

1. Instalar docker - [link](https://www.docker.com/get-started/)

2. Inicializar container com o postgres

```cmd
docker run --name=postgres -e POSTGRES_PASSWORD=123456 --restart=always -p 5432:5432 -d postgres:14
```

3. Instalar gerenciador de banco de dados

- Eu tô usando o [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver16), mas pode ser qualquer outro.

4. Conectar com o banco:

- username: `postgres`
- senha: `123456`

5. Criar db e tabelas

```sql
CREATE DATABASE flipman


CREATE TABLE players (
    id SERIAL PRIMARY KEY, 
    card int NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255),
    cellphone char(11)
)
```