# 🔧 API - Desafio Técnico Backend

Esta é a API REST desenvolvida em NestJS para o sistema de movimentações financeiras.

## 🛠️ Tecnologias Utilizadas

- **NestJS** - Framework Node.js para APIs escaláveis
- **Fastify** - Web framework de alta performance
- **Prisma** - ORM para gerenciamento do banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **Swagger** - Documentação automática da API
- **TypeScript** - Linguagem de programação

## 📋 Funcionalidades

- ✅ Autenticação JWT
- ✅ Registro e login de usuários
- ✅ CRUD de categorias
- ✅ CRUD de transações financeiras
- ✅ Validação de dados
- ✅ Documentação Swagger
- ✅ CORS habilitado

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- PostgreSQL (com schema chamado `psa`)
- npm ou yarn

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/database_name"
JWT_SECRET="seu-jwt-secret-aqui"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
```

### 3. Configurar banco de dados
Execute as migrations do Prisma:
```bash
npx prisma migrate dev
```

Gerar o cliente Prisma:
```bash
npx prisma generate
```

### 4. Executar a aplicação

#### Desenvolvimento
```bash
npm run start:dev
```

#### Produção
```bash
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3001`

## 📖 Documentação da API

Após executar a aplicação, acesse a documentação Swagger em:
```
http://localhost:3001/swagger
```

## 🗂️ Estrutura do Projeto

```
src/
├── app.module.ts           # Módulo principal
├── main.ts                # Arquivo de entrada
├── auth/                  # Módulo de autenticação
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/              # DTOs de autenticação
│   └── jwat-auth.guard.ts # Guard JWT
├── user/                 # Módulo de usuários
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.module.ts
│   ├── user.entity.ts
│   └── user.decorator.ts
├── category/             # Módulo de categorias
├── transaction/          # Módulo de transações
└── database/            # Configuração do banco
```

## 🗄️ Banco de Dados

O projeto utiliza Prisma como ORM com PostgreSQL. As migrations estão localizadas em:
```
prisma/
├── schema.prisma         # Schema do banco
└── migrations/          # Migrations
```

Para visualizar o banco de dados:
```bash
npx prisma studio
```

## 🔧 Scripts Disponíveis

```bash
npm run start:dev      # Executar em modo desenvolvimento
npm run start:prod     # Executar em modo produção
npm run build          # Build da aplicação
npm run lint           # Executar ESLint
npm run test           # Executar testes
npm run test:e2e       # Executar testes e2e
```

## 🌍 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL de conexão com PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Chave secreta para JWT | `seu-jwt-secret-muito-seguro` |
| `PORT` | Porta da aplicação | `3001` |
| `CORS_ORIGIN` | Origem permitida para CORS | `http://localhost:3000` |

## 📝 Notas de Desenvolvimento

- JWT é implementado com guard personalizado ([`JwtAuthGuard`](src/auth/jwat-auth.guard.ts))
- Validação global de dados usando ValidationPipe
- CORS configurado para permitir requisições do frontend
- Swagger configurado para documentação automática
