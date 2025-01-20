# MyAccess

Projeto do backend do sistema MyAccess

## Para Rodar o Projeto
Instale um instancia Postgres na sua maquina;

Crie o banco de dados e tabelas necessários com o script abaixo:

```SQL
-- Criação do banco myaccess
CREATE DATABASE myaccess;

-- Criação da tabela para armazenar os dados do usuário
CREATE TABLE users (
    id SERIAL PRIMARY KEY,                        -- Identificador único, gerado automaticamente
    name VARCHAR(255) NOT NULL,                  -- Nome 
    username VARCHAR(50) NOT NULL UNIQUE,        -- Nome de usuário
    email VARCHAR(100) NOT NULL UNIQUE,          -- Email único
    password VARCHAR(255) NOT NULL,              -- Senha do usuário
    profileImage VARCHAR(500),                  -- URL da imagem de perfil
    description TEXT,                            -- Descrição do usuário
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data de atualização
);
```

Clone o repositorio e entre na pasta do projeto no terminal

```bash
git clone https://github.com/Note45/backend-myaccess
cd backend-myaccess
```
Crie um arquivo .env dentro da pasta do projeto com o conteudo abaixo.

```bash
PORT=3001
DB_USER=SEU_VALOR
DB_HOST=SEU_VALOR
DB_DATABASE=SEU_VALOR
DB_PASSWORD=SEU_VALOR
DB_PORT=SEU_VALOR
JWT_SECRET=SEU_VALOR
AWS_ACCESS_KEY_ID=SEU_VALOR
AWS_SECRET_ACCESS_KEY=SEU_VALOR
AWS_REGION=SEU_VALOR
AWS_BUCKET_NAME=SEU_VALOR
```
Instale as dependencias com o comando abaixo.

```bash
yarn
```
Execute o projeto.

```bash
yarn dev
```


