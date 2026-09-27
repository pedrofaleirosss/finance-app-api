# 💰 Finance App API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## 📖 Sobre o projeto

A **Finance App API** é uma API RESTful desenvolvida com Node.js e Express.js para o gerenciamento de finanças pessoais.

O projeto permite cadastrar usuários, registrar movimentações financeiras e acompanhar o saldo individual, organizando as transações em três categorias: receitas, despesas e investimentos.

Além das funcionalidades financeiras, o desenvolvimento tem como foco a aplicação de boas práticas de engenharia de software, como separação de responsabilidades, organização em camadas, validação de dados e testes automatizados.

O projeto foi desenvolvido durante os estudos no **Full Stack Club**.

---

## 🚀 Funcionalidades

### 👤 Gerenciamento de usuários

- Cadastro de novos usuários.
- Consulta de usuário pelo ID.
- Atualização de informações cadastrais.
- Exclusão de usuários.
- Consulta do saldo financeiro individual.

### 💸 Gerenciamento de transações

- Cadastro de transações financeiras.
- Listagem de transações por usuário.
- Atualização de transações existentes.
- Exclusão de transações.
- Classificação das movimentações financeiras por tipo.
- Associação de cada transação a um usuário.

### 📊 Controle financeiro

As transações são classificadas em três categorias:

| Tipo         | Descrição                           |
| ------------ | ----------------------------------- |
| `EARNING`    | Receitas e entradas de dinheiro.    |
| `EXPENSE`    | Despesas e saídas de dinheiro.      |
| `INVESTMENT` | Valores destinados a investimentos. |

A API também disponibiliza um endpoint para consultar o resumo financeiro de um usuário, incluindo:

- Total de receitas.
- Total de despesas.
- Total de investimentos.
- Saldo disponível.

---

## 🛠️ Tecnologias utilizadas

### Backend

| Tecnologia | Finalidade                                    |
| ---------- | --------------------------------------------- |
| Node.js    | Ambiente de execução JavaScript.              |
| Express.js | Construção da API RESTful.                    |
| JavaScript | Linguagem de programação.                     |
| PostgreSQL | Banco de dados relacional.                    |
| Prisma ORM | Modelagem e comunicação com o banco de dados. |
| Zod        | Validação de dados.                           |
| Bcrypt     | Hashing de senhas.                            |
| UUID       | Identificação única dos registros.            |

### Testes e qualidade de código

| Tecnologia  | Finalidade                                         |
| ----------- | -------------------------------------------------- |
| Jest        | Execução de testes automatizados.                  |
| Supertest   | Testes de endpoints HTTP.                          |
| Faker.js    | Geração de dados para testes.                      |
| Docker      | Execução dos bancos de dados em contêineres.       |
| ESLint      | Análise estática do código.                        |
| Prettier    | Padronização da formatação.                        |
| Husky       | Automação de Git Hooks.                            |
| lint-staged | Execução de verificações nos arquivos modificados. |

### Documentação

- Swagger UI para visualização e exploração dos endpoints da API.
- Especificação Swagger 2.0.

---

## 🏗️ Arquitetura do projeto

O projeto utiliza uma arquitetura organizada em camadas, buscando manter as responsabilidades separadas e facilitar a manutenção, evolução e testabilidade da aplicação.

O fluxo das requisições segue a organização:

```text
HTTP Request
     |
     v
   Routes
     |
     v
 Controllers
     |
     v
  Use Cases
     |
     v
 Repositories
     |
     v
 Prisma ORM
     |
     v
 PostgreSQL
```

### Responsabilidades

**Routes:** definem os endpoints HTTP e encaminham as requisições para os controllers.

**Controllers:** recebem os dados das requisições, realizam a validação necessária e coordenam a execução dos casos de uso.

**Use Cases:** concentram as regras de negócio e as funcionalidades da aplicação.

**Repositories:** abstraem as operações de persistência e consulta dos dados.

**Factories:** realizam a composição das dependências necessárias para a execução dos controllers e casos de uso.

Essa separação permite testar diferentes partes da aplicação de forma independente e reduzir o acoplamento entre a lógica de negócio e a infraestrutura.

---

## 🗄️ Modelagem do banco de dados

A aplicação possui duas entidades principais: `User` e `Transaction`.

### User

Representa os usuários cadastrados na aplicação.

| Campo      | Tipo   | Descrição                       |
| ---------- | ------ | ------------------------------- |
| id         | UUID   | Identificador único do usuário. |
| first_name | String | Primeiro nome.                  |
| last_name  | String | Sobrenome.                      |
| email      | String | E-mail único.                   |
| password   | String | Senha armazenada.               |

### Transaction

Representa as movimentações financeiras.

| Campo   | Tipo    | Descrição                             |
| ------- | ------- | ------------------------------------- |
| id      | UUID    | Identificador único da transação.     |
| user_id | UUID    | Identificador do usuário responsável. |
| name    | String  | Nome da transação.                    |
| date    | Date    | Data da movimentação.                 |
| amount  | Decimal | Valor financeiro.                     |
| type    | Enum    | Tipo da movimentação.                 |

### Relacionamento

```text
User (1) ──────────── (N) Transaction
```

Um usuário pode possuir várias transações, enquanto cada transação pertence a um único usuário.

A exclusão de um usuário também remove suas transações associadas por meio do comportamento `onDelete: Cascade`.

A modelagem completa pode ser consultada em [`prisma/schema.prisma`](./prisma/schema.prisma).

---

## ⚙️ Como executar o projeto

### Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

### 1. Clone o repositório

```bash
git clone https://github.com/pedrofaleirosss/finance-app-api.git
```

Acesse a pasta do projeto:

```bash
cd finance-app-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

Você pode utilizar o arquivo `.env.example` como referência:

```env
PORT=3000

DATABASE_URL="postgresql://postgres:password@localhost:5432/finance-app?schema=public"
```

| Variável     | Descrição                          |
| ------------ | ---------------------------------- |
| PORT         | Porta em que a API será executada. |
| DATABASE_URL | URL de conexão com o PostgreSQL.   |

### 4. Inicie o banco de dados

O projeto possui um arquivo `docker-compose.yml` que configura o PostgreSQL.

Para iniciar o banco de desenvolvimento, execute:

```bash
docker compose up -d postgres
```

O banco de desenvolvimento estará disponível na porta `5432`.

### 5. Configure o Prisma

Gere o Prisma Client:

```bash
npx prisma generate
```

Sincronize o schema com o banco de dados:

```bash
npx prisma db push
```

### 6. Inicie a aplicação

Para executar o projeto em modo de desenvolvimento:

```bash
npm run start:dev
```

Para executar normalmente:

```bash
npm start
```

Com a configuração apresentada, a API estará disponível em:

```text
http://localhost:3000
```

---

## 📚 Documentação da API

A documentação interativa foi implementada utilizando Swagger UI.

Após iniciar a aplicação, acesse:

**http://localhost:3000/docs**

Na documentação, é possível visualizar os endpoints disponíveis, consultar os parâmetros esperados, verificar os modelos de dados e executar requisições diretamente pelo navegador.

O arquivo de especificação também está disponível em [`docs/swagger.json`](./docs/swagger.json).

---

## 🔗 Endpoints

### Usuários

| Método | Endpoint                     | Descrição                     |
| ------ | ---------------------------- | ----------------------------- |
| POST   | `/api/users`                 | Cadastrar um usuário.         |
| GET    | `/api/users/:userId`         | Consultar um usuário pelo ID. |
| PATCH  | `/api/users/:userId`         | Atualizar um usuário.         |
| DELETE | `/api/users/:userId`         | Excluir um usuário.           |
| GET    | `/api/users/:userId/balance` | Consultar o saldo financeiro. |

### Transações

| Método | Endpoint                           | Descrição                           |
| ------ | ---------------------------------- | ----------------------------------- |
| POST   | `/api/transactions`                | Cadastrar uma transação.            |
| GET    | `/api/transactions?userId=UUID`    | Listar as transações de um usuário. |
| PATCH  | `/api/transactions/:transactionId` | Atualizar uma transação.            |
| DELETE | `/api/transactions/:transactionId` | Excluir uma transação.              |

---

## 💻 Exemplos de utilização

### Criar um usuário

**POST** `/api/users`

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@doe.com",
  "password": "password123"
}
```

### Criar uma transação

**POST** `/api/transactions`

```json
{
  "user_id": "a5235da6-c391-490b-8ff3-8c5f430beed1",
  "name": "Salary",
  "date": "2026-01-01T00:00:00.000Z",
  "type": "EARNING",
  "amount": 5000
}
```

Os tipos aceitos são:

```text
EARNING
EXPENSE
INVESTMENT
```

### Consultar transações de um usuário

**GET** `/api/transactions?userId=a5235da6-c391-490b-8ff3-8c5f430beed1`

### Consultar o saldo financeiro

**GET** `/api/users/:userId/balance`

Exemplo de resposta:

```json
{
  "earnings": "5000",
  "expenses": "1500",
  "investments": "1000",
  "balance": "2500"
}
```

---

## 🧪 Testes automatizados

O projeto utiliza **Jest** e **Supertest** para realizar testes automatizados e verificar o funcionamento das funcionalidades e endpoints.

Os testes são executados utilizando um banco PostgreSQL separado do ambiente de desenvolvimento, garantindo o isolamento dos dados.

### Configuração do ambiente de testes

Crie um arquivo `.env.test` na raiz do projeto:

```env
PORT=3001

DATABASE_URL="postgresql://postgres:password@localhost:5433/finance-app?schema=public"
```

O arquivo `docker-compose.yml` disponibiliza dois serviços:

| Serviço         | Contêiner                 | Porta |
| --------------- | ------------------------- | ----- |
| Desenvolvimento | finance-app-postgres      | 5432  |
| Testes          | finance-app-postgres-test | 5433  |

O setup global do Jest é responsável por iniciar o contêiner de testes e sincronizar o schema do Prisma antes da execução.

### Executar todos os testes

```bash
npm test
```

### Executar em modo watch

```bash
npm run test:watch
```

### Gerar relatório de cobertura

```bash
npm run test:coverage
```

O relatório de cobertura é gerado no diretório:

```text
coverage/
```

---

## 🧹 Qualidade de código

O projeto utiliza ESLint e Prettier para manter a consistência e a legibilidade do código.

### Verificar o código com ESLint

```bash
npm run eslint:check
```

### Verificar a formatação com Prettier

```bash
npm run prettier:check
```

O projeto também utiliza Husky e lint-staged para auxiliar na execução automatizada de verificações durante o fluxo de desenvolvimento com Git.

---

## 📌 Scripts disponíveis

| Comando                  | Descrição                                      |
| ------------------------ | ---------------------------------------------- |
| `npm start`              | Inicia a aplicação.                            |
| `npm run start:dev`      | Inicia a aplicação em modo de desenvolvimento. |
| `npm test`               | Executa os testes automatizados.               |
| `npm run test:watch`     | Executa os testes em modo watch.               |
| `npm run test:coverage`  | Executa os testes com relatório de cobertura.  |
| `npm run eslint:check`   | Verifica o código com ESLint.                  |
| `npm run prettier:check` | Verifica a formatação com Prettier.            |

---

## 👨‍💻 Autor

Desenvolvido por **Pedro Faleiros**.

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pedrofaleirosss)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pedro-faleiros123/)

---

<p align="center">
  Desenvolvido com 💙 e JavaScript.
</p>
