# 💻 Frontend - Movimentações Financeiras

Frontend da aplicação de gerenciamento de movimentações financeiras desenvolvido com Next.js 14+ e TypeScript.

## 🧰 Stack Técnica

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **TanStack Query (React Query)**
- **Context API**
- **Lucide React** (Ícones)

## 📁 Estrutura do Projeto

```text
📦 ui/
├── 📁 .next/                    # Build files (auto-gerado)
├── 📁 public/                   # Arquivos estáticos
├── 📁 src/
│   ├── 📁 app/                  # App Router (Next.js 13+)
│   │   ├── 📁 (protected)/      # Páginas protegidas (apenas para organização e header)
│   │   │   └── 📁 dashboard        #Página de dashboard e seus componentes
│   │   ├── 📁 login/            # Página de login
│   │   ├── 📁 register/         # Página de registro
│   │   ├── 📁 instructions/     # Instruções do desafio
│   │   ├── layout.tsx           # Layout raiz
│   │   ├── page.tsx             # Página inicial
│   │   ├── globals.css          # Estilos globais
│   │   └── Providers.tsx        # Providers globais
│   │
│   ├── 📁 components/           # Componentes reutilizáveis
│   │   ├── Button/                  # Componentes base (Button, Modal, etc)
│   │   └── ...
│   │
│   ├── 📁 context/              # Context API
│   │   └── AuthContext.tsx     # Context de autenticação (Context API)
│   │
│   ├── 📁 hooks/                # Custom hooks
│   │   └── useCategory.ts      # Hook de categorias
│   │
│   ├── 📁 lib/                  # Configurações e utilitários
│   │   └── api.ts              # Cliente HTTP
│   │
│   ├── 📁 services/             # Serviços da API
│   │   ├── authService.ts             # Serviços de autenticação
│   │   ├── transactionsService.ts     # Serviços de transações
│   │   └── categoriesService.ts       # Serviços de categorias
│   │
│   ├── 📁 types/                # Tipos TypeScript
│   │   ├── auth.ts             # Tipos de autenticação
│   │   ├── category.ts         # Tipos de categorias
│   │   ├── transaction.ts      # Tipos de transações
│   │   └── user.ts             # Tipos de usuarios
│   │
│   ├── 📁 utils/                # Funções utilitárias
│   │   └── formatters.ts           # Formatação de dados
│   │
│   └── middleware.ts            # Middleware do Next.js
│
├── .env                   # Variáveis de ambiente
├── .env.example                 # Exemplo de variáveis
├── next.config.ts               # Configuração do Next.js
├── tailwind.config.ts           # Configuração do Tailwind
├── tsconfig.json                # Configuração do TypeScript
└── package.json                 # Dependências e scripts
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Backend (API) rodando

### Instalação e Execução

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Edite o arquivo .env
# NEXT_PUBLIC_API_URL=http://localhost:3001

# Execute em modo de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificação de linting
npm run type-check   # Verificação de tipos TypeScript
```

## 🔧 Configuração

### Variáveis de Ambiente (.env)

```env
# URL da API backend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📱 Páginas e Funcionalidades

### 🔐 Autenticação
- **[`/login`](src/app/login/page.tsx)** - Login de usuários
- **[`/register`](src/app/register/page.tsx)** - Cadastro de novos usuários

### 📊 Dashboard
- **[`/dashboard`](src/app/dashboard/page.tsx)** - Dashboard principal com:
  - Cards de resumo (Receitas, Despesas, Saldo)
  - Lista de transações
  - Modal para criar transações
  - Modal para criar categorias
