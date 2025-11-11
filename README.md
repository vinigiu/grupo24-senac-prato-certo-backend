# 🍽️ Prato Certo - Backend

Backend do projeto **Prato Certo**, desenvolvido em **NestJS** com **PostgreSQL**.  
Esta API fornece os recursos necessários para o aplicativo móvel, incluindo o gerenciamento de receitas, ingredientes, instruções e demais entidades relacionadas.

---

## 📋 Sumário

- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Configuração inicial](#-configuração-inicial)
- [Executando com Docker Compose](#-executando-com-docker-compose)
- [Endpoints principais](#-endpoints-principais)
- [Licença](#-licença)

---

## 🚀 Tecnologias

- **Node.js 20+**
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Docker & Docker Compose**
- **dotenv** (para gerenciamento de variáveis de ambiente)

---

## 💻 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

| Ferramenta | Descrição |
|-------------|------------|
| 🐳 [Docker](https://docs.docker.com/get-docker/) | Necessário para rodar containers |
| 🧩 [Docker Compose](https://docs.docker.com/compose/) | Orquestrador de containers |
| 🧠 [Git](https://git-scm.com/) | Para clonar o repositório |
| (Opcional) 🧑‍💻 [Node.js](https://nodejs.org/) | Caso queira rodar fora do Docker |

> 💡 Se você tiver **Docker e Docker Compose** instalados, **não precisa instalar Node.js nem PostgreSQL localmente** — tudo será executado dentro dos containers.

---
## ⚙️ Configuração inicial

Clone o repositório:

```bash
git clone https://github.com/vinigiu/grupo24-senac-prato-certo-backend.git
cd grupo24-senac-prato-certo-backend
```

Crie o arquivo .env na raiz do projeto utilizando como base o arquivo .env.example que se encontra na raiz do projeto.

## 🐳 Executando com Docker Compose

Com tudo configurado, execute:
```bash
sudo docker compose up -d --build
```

Isso fará com que:

A imagem do backend NestJS seja construída.

Um container PostgreSQL seja criado e iniciado.

O container da aplicação prato_certo_app seja iniciado automaticamente.

A API estará disponível em:

👉 http://localhost:3000

Para visualizar os logs da aplicação em tempo real:
```bash
sudo docker logs -f prato_certo_app
```

## Documentaçâo Swagger
- Após ter a aplicação rodando localmente, é possível acessar a documentação swagger através do endpoint:
👉 http://localhost:3000/api

## 📡 Endpoints principais (exemplos)

| Método | Rota         | Descrição                        |
|:-------|:------------:|---------------------------------:|
| POST   | /login       | Realiza authenticação do usuário |
| GET	 | /recipes	    | Lista todas as receitas          |
| POST   | /recipes	    | Cria uma nova receita            |
| GET    | /recipes/:id | Retorna detalhes de uma receita  |
| PUT	 | /recipes/:id	| Atualiza uma receita             |
| DELETE | /recipes/:id	| Remove uma receita               |

## 🪪 Licença

Este projeto é de uso acadêmico, desenvolvido para o curso de Análise e Desenvolvimento de Sistemas - SENAC.

## 👨‍💻 Autores

Vinícius Giuseppe Guida Lucena de Oliveira