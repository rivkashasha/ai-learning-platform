# AI-Driven Learning Platform

A full-stack mini MVP for AI-driven learning, featuring user registration, category/subcategory selection, AI-generated lessons, learning history, and an admin dashboard.

---

## Features

- User registration and login
- Select category and subcategory for learning
- Submit prompts to an AI and receive generated lessons
- View your learning history
- Admin dashboard: view all users and all prompts
- Modern, responsive UI
- REST API backend with database and AI integration
- Organized project structure (controllers, models, services, etc.)
- Basic input validation and API error handling
- Configuration management via dotenv/appsettings
- **Swagger/OpenAPI documentation**

---

## Technologies Used

### Backend

- **.NET 9** (ASP.NET Core Web API)
- **MongoDB** (with custom DAL)
- **OpenAI GPT API** (integrated via service layer)
- **Docker** (for database containerization)
- **dotenv-style** configuration via `appsettings.json`
- **Swagger/OpenAPI** for API documentation

### Frontend

- **Framework:** React + TypeScript + Vite
- **State Management:** Redux Toolkit, React Redux
- **Routing:** React Router
- **Styling:** CSS modules
- **Linting:** ESLint, typescript-eslint, react-hooks, react-refresh
- **Env Management:** dotenv
- **Other:** Modern CSS, responsive design

---

## Project Structure

```
ai-driven-learning-backend/
│
├── Bl/                   
├── Dal/                  
├── Models/               
├── Controllers/          
├── appsettings.json      
├── Program.cs            
├── Dockerfile            
├── docker-compose.yml    
├── README.md
├── Properties/
├── Migrations/           // (if using EF Core migrations)
├── ...Swagger/OpenAPI setup...
│
ai-driven-learning-frontend/
│
├── src/
│   ├── api/              
│   ├── components/       
│   ├── redux/            
│   ├── css/              
│   ├── assets/           
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── vite.config.ts
└── README.md
```

---

## Setup Instructions

### Prerequisites

- .NET 9 SDK (ASP.NET Core)
- npm or yarn (for frontend)
- Docker (for DB, recommended)
- OpenAI API key (if using real AI integration)

---

### 1. Clone the repository

```sh
git clone https://github.com/rivkashasha/ai-driven-learning-platform.git
cd ai-driven-learning-platform
```

---

### 2. Backend Setup

```sh
cd ai-driven-learning-backend
cp appsettings.example.json appsettings.json
# Edit appsettings.json with your DB connection, OpenAI key, etc.

# If using Docker for DB
docker-compose up -d

# Build and run backend
dotnet build
dotnet run
```

---

### 3. Frontend Setup

```sh
cd ../ai-driven-learning-frontend
cp .env.example .env
# Edit .env with your API base URL and admin ID

npm install
# or
yarn install

npm run dev
# or
yarn dev
```


---

## Environment Variables

### Backend `appsettings.json`

```json
{
  "ConnectionStrings": {
    "MongoDb": "mongodb://localhost:27017/ai_learning"
  },
  "OpenAI": {
    "ApiKey": "sk-..."
  }
}
```

### Frontend `.env.example`

```
VITE_ADMIN_ID=223456789
VITE_API_BASE_URL=https://localhost:7156/api
```

---

## How to Use

1. **Register:** Go to `/signup` and create a new user.
2. **Login:** Go to `/login` and enter your user ID.
   - If you use the admin ID from `.env`, you will see the admin dashboard.
   - Any other ID will show the regular user dashboard.
3. **Dashboard:** Select a category/subcategory, enter a prompt, and get a lesson.
4. **History:** View your previous prompts and AI responses.
5. **Admin Dashboard:** View all users and all prompts.

---

## API Models

- **users:** id, name, phone
- **categories:** id, name
- **sub_categories:** id, name, category_id
- **prompts:** id, user_id, category_id, sub_category_id, prompt, response, created_at

---

## Plugins & Packages Used

- `@reduxjs/toolkit`
- `react-redux`
- `react-router-dom`
- `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `typescript-eslint`
- `dotenv`
- `vite`
- **Swashbuckle.AspNetCore** (for Swagger/OpenAPI)
- (see `package.json` for full list)
---
