# TODO API - Backend

API REST para gerenciamento de tarefas desenvolvida em Node.js com TypeScript.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express.js
- SQLite
- JWT para autenticação
- Jest para testes
- Swagger para documentação

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env
```

## ⚙️ Execução

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Testes
npm test
```

## 📚 Documentação da API

Acesse `http://localhost:3000/api-docs` após iniciar o servidor.

## 🔐 Variáveis de Ambiente

- `PORT`: Porta do servidor (padrão: 3000)
- `JWT_SECRET`: Chave secreta para JWT
- `JWT_EXPIRES_IN`: Tempo de expiração do token (padrão: 7d)

## 📦 Estrutura do Projeto

```
src/
├── __tests__/       # Testes unitários
├── config/          # Configurações (database, swagger)
├── controllers/     # Controladores (authController, taskController)
├── middlewares/     # Middlewares (authMiddleware)
├── models/          # Modelos de dados (User, Task)
├── routes/          # Rotas da API (authRoutes, taskRoutes)
├── types/           # Tipos TypeScript
├── utils/           # Utilitários (auth)
└── server.ts        # Arquivo principal
```

## 📖 Endpoints da API

### Autenticação (não requer token)

**POST /api/auth/register**
- Cadastrar novo usuário
- Body: `{ name, email, password }`

**POST /api/auth/login**
- Realizar login
- Body: `{ email, password }`
- Retorna: token JWT

### Tarefas (requer autenticação via Bearer token)

**POST /api/tasks**
- Criar nova tarefa
- Headers: `Authorization: Bearer <token>`
- Body: `{ description, priority }` (priority: Alta, Média ou Baixa)

**GET /api/tasks/pending**
- Listar tarefas pendentes do usuário autenticado
- Headers: `Authorization: Bearer <token>`

**PATCH /api/tasks/:id/status**
- Atualizar status da tarefa (pending ou completed)
- Headers: `Authorization: Bearer <token>`
- Body: `{ status }`

**DELETE /api/tasks/:id**
- Excluir tarefa
- Headers: `Authorization: Bearer <token>`

## 🧪 Testes

O projeto possui cobertura de testes unitários de pelo menos 50% do código.

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch
```

## 🔒 Segurança

- Senhas são armazenadas usando bcrypt (hash)
- Autenticação via JWT (JSON Web Token)
- Middleware de autenticação protege rotas privadas
- Validação de dados de entrada com express-validator
- Usuários só podem acessar suas próprias tarefas

## 🚀 Deploy

1. Build do projeto:
```bash
npm run build
```

2. O diretório `dist/` conterá os arquivos JavaScript compilados

3. Executar em produção:
```bash
npm start
```

## 📝 Notas de Desenvolvimento

- Banco de dados SQLite é criado automaticamente na primeira execução
- Arquivo `database.db` é gerado na raiz do projeto
- Não é necessário configurar banco de dados externo
