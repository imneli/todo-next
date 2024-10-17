# Sistema de Gerenciamento de Tarefas

## 📝 Sobre o Projeto

Este é um sistema de gerenciamento de tarefas desenvolvido com Next.js e Firebase, permitindo que usuários criem, organizem e acompanhem suas tarefas diárias. O sistema conta com autenticação via Google e funcionalidades em tempo real.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com SSR
- **Firebase** - Backend e Autenticação
- **TypeScript** - Linguagem de programação
- **NextAuth** - Sistema de autenticação
- **CSS Modules** - Estilização
- **Google Auth** - Autenticação com Google

## ✨ Funcionalidades

- ✅ Autenticação com Google
- 📱 Design Responsivo
- 💾 Armazenamento em tempo real com Firebase
- 🔒 Proteção de rotas
- 📋 CRUD completo de tarefas
- 💬 Sistema de comentários
- 🎨 Interface moderna e intuitiva

## 📦 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Uma conta no Firebase
- Uma conta Google Cloud Platform para autenticação

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/imneli/todo-next.git
```

2. Acesse a pasta do projeto:
```bash
cd todo-next
```

3. Instale as dependências:
```bash
npm install
# ou
yarn install
```

4. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id

# Google Auth
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_secret_key
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## 🏗️ Estrutura do Projeto

```
todo-next/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── styles/
├── .env.local
└── package.json
```

## 📱 Layout Responsivo

O sistema é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:
- Desktop: Layout completo com sidebar
- Tablet: Menu hamburguer e layout adaptado
- Mobile: Interface otimizada para telas pequenas

## 🔐 Autenticação

O sistema utiliza autenticação via Google através do NextAuth.js, garantindo:
- Login seguro
- Persistência de sessão
- Proteção de rotas
- Gestão de estado do usuário

## 🎯 Funcionalidades Principais

### Gestão de Tarefas
- Criar novas tarefas
- Editar tarefas existentes
- Marcar tarefas como concluídas
- Excluir tarefas
- Filtrar tarefas

### Sistema de Comentários
- Adicionar comentários às tarefas
- Visualizar comentários de outros usuários
- Interagir com comentários

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👨‍💻 Autor

Imneli - [GitHub](https://github.com/imneli)