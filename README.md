# 💼 Sistema de Gestão Financeira Pessoal

Um sistema de gestão de movimentações financeiras com autenticação de usuários, categorização de transações e relatórios em tempo real.

## 🌟 Visão Geral

Este projeto é uma aplicação full-stack para controle financeiro pessoal, permitindo que usuários registrem, categorizem e monitorem suas receitas e despesas de forma intuitiva e segura.

### 🔗 Demonstração
- **Frontend**: https://psa-desafio-dev-pleno.vercel.app/
- **API Docs**: https://desafio-dev-pleno.onrender.com/swagger

## ⚡ Características Principais

- 🔐 **Autenticação Segura**: Sistema de login/registro com JWT
- 💰 **Gestão de Transações**: Registre receitas e despesas com facilidade
- 🏷️ **Categorização**: Organize suas movimentações com categorias personalizáveis
- 📊 **Dashboard Interativo**: Visualize seu saldo, receitas e despesas em tempo real
- 🛡️ **Validação Robusta**: Dados sempre consistentes e seguros

## 🛠️ Stack Tecnológica

### Backend (API)
- **NestJS** - Framework Node.js escalável
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **Swagger** - Documentação automática da API

### Frontend (UI)
- **Next.js 14+** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de CSS utilitário
- **TanStack Query** - Gerenciamento de estado servidor
- **React Hook Form** - Formulários performáticos
- **Zod** - Validação de schemas

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/BernardoHaab/desafio-dev-pleno
cd desafio-dev-pleno
```

### 2. Configure o Backend
```bash
cd api

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações de banco

# Execute as migrations
npx prisma migrate dev
npx prisma generate

# Inicie o servidor
npm run start:dev
```

A API estará disponível em `http://localhost:3001`

### 3. Configure o Frontend
```bash
cd ../ui

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Configure NEXT_PUBLIC_API_URL=http://localhost:3001

# Inicie o desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
📦 desafio-dev-pleno/
├── 📁 api/                      # Backend NestJS
│   ├── 📁 src/
│   │   ├── 📁 auth/            # Autenticação JWT
│   │   ├── 📁 user/            # Gestão de usuários
│   │   ├── 📁 category/        # Categorias
│   │   ├── 📁 transaction/     # Transações financeiras
│   │   └── 📁 database/        # Configuração Prisma
│   ├── 📁 prisma/              # Schema e migrations
│   └── 📄 README.md
│
├── 📁 ui/                       # Frontend Next.js
│   ├── 📁 src/
│   │   ├── 📁 app/             # Páginas (App Router)
│   │   ├── 📁 components/      # Componentes reutilizáveis
│   │   ├── 📁 services/        # Cliente API
│   │   ├── 📁 types/           # Tipos TypeScript
│   │   └── 📁 utils/           # Utilitários
│   └── 📄 README.md
│
└── 📄 README.md                 # Este arquivo
```

## 🔧 Configuração do Banco de Dados

### PostgreSQL Setup
1. Crie um banco de dados PostgreSQL
2. Crie um schema chamado `psa`
3. Configure a `DATABASE_URL` no arquivo `.env` da API:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

### Migrations
As migrations do Prisma criarão automaticamente as tabelas necessárias:
- `users` - Usuários do sistema
- `categories` - Categorias de transações
- `transactions` - Movimentações financeiras

## 📖 Documentação da API

Após executar o backend, acesse a documentação Swagger em:
```
http://localhost:3001/swagger
```

### Principais Endpoints

- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login
- `GET /auth/validate-token` - Validação de token
- `GET /category/list` - Listar categorias
- `POST /category/create` - Criar categoria
- `GET /transaction/list` - Listar transações
- `POST /transaction/create` - Criar transação
- `GET /transaction/balance` - Obter saldo

## 🌍 Variáveis de Ambiente

### Backend (.env)
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
JWT_SECRET="seu-jwt-secret-muito-seguro"
JWT_EXPIRATION="7d"
CORS_ORIGIN="http://localhost:3000"
PORT=3001
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## 🚀 Deploy

### Backend
1. Configure as variáveis de ambiente em produção
2. Execute as migrations: `npx prisma migrate deploy`
3. Build: `npm run build`
4. Start: `npm run start:prod`

### Frontend
1. Configure `NEXT_PUBLIC_API_URL` para a URL da API em produção
2. Build: `npm run build`
3. Start: `npm run start`

