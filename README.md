# DrivenPass - Gerenciador de Senhas

O DrivenPass é uma aplicação de back-end para o gerenciamento de senhas de sites e aplicativos desenvolvidas em Node. Ela funciona através de requisições HTTP(s) seguindo a convenção REST.

# Como funciona?

A API oferece diferentes endpoints para lidar com credenciais e usuários:

## Endpoints de Credenciais (/credentials)

**- POST /credentials**: Cria uma nova credencial. Requer autenticação do token do usuário e validação do esquema da credencial antes de criar a mesma.

**- GET /credentials**: Retorna todas as credenciais. Requer autenticação do token do usuário.

**- GET /credentials/:id**: Retorna uma credencial específica com base no seu ID. Requer autenticação do token do usuário.

**- DELETE /credentials/:id**: Remove uma credencial com base no seu ID. Requer autenticação do token do usuário.

## Endpoints de Usuários (/users)

**- POST /register**: Registra um novo usuário. Requer validação do esquema do usuário antes de se registrar.

**- POST /login**: Realiza o login do usuário. Requer validação do esquema do usuário antes de realizar o login.

# Motivação

Este projeto foi desenvolvido com o objetivo de praticar a construção de uma API REST utilizando Node, Express, TypeScript, Prisma. Também criei testes de integração automatizados utilizando Jest e Supertest.

# Tecnologias Utilizadas

Para este projeto foram utilizadas as seguintes tecnologias:

Node (versão 18.17.0)
Express
TypeScript
Prisma
Postgres
Jest e Supertest
Joi
http-status
Bcrypt
Faker
jsonwebtoken
Nodemon

Executando o Projeto em Desenvolvimento

Para rodar este projeto em desenvolvimento, siga os passos abaixo:

- Clone este repositório.
- Instale as dependências necessárias com o comando: npm install.
- Crie o arquivo .env baseado no .env.example.
- Para executar os testes, será necessário criar outro arquivo .env.test baseado no .env.example.
- No arquivo .env, insira as seguintes propriedades:

```DATABASE_URL="postgresql://postgres..."```


- A propriedade DATABASE_URL é utilizada para a conexão com o banco de dados.
- Execute o Prisma para criar o banco de dados e as tabelas necessárias usando o comando: npx prisma migrate dev.
- Para iniciar o projeto em modo de desenvolvimento, use o comando npm run dev.
- Testes manuais podem ser realizados utilizando o Thunder Client.
