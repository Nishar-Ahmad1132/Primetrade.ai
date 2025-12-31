```
🚀 Backend Developer Internship Assignment – Primetrade.ai

This project is a full-stack task management system built as part of the Backend Developer Internship Assignment.
It demonstrates secure REST API design, JWT authentication, role-based access, and a modern React frontend.

📌 Features
🔐 Authentication & Authorization

User registration & login

Password hashing using bcrypt

JWT-based authentication

Role support (user, admin)

Protected routes

📝 Task Management

Create, read, update, delete (CRUD) tasks

Task status: pending / completed

Inline task editing

Toggle task status

Owner-based access control

Admin override support

🎨 Frontend (React + Tailwind CSS)

Modern, responsive UI

Login & Register pages

Show/Hide password

Protected dashboard

Toast notifications

Admin badge (decoded from JWT)

🧠 Developer Experience

Clean folder structure

API versioning (/api/v1)

Centralized error handling

Swagger API documentation

Environment-based configuration

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

bcrypt

Swagger (OpenAPI)

Frontend

React (Vite)

Tailwind CSS (v4)

Axios

React Router

react-hot-toast

📁 Project Structure
Primetrade_ai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── docs/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/Nishar-Ahmad1132/Primetrade.ai.git
cd Primetrade_ai

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/primetrade
JWT_SECRET=your_secret_key
JWT_EXPIRE=15m


Run backend:

npm run dev


Backend runs on:

http://localhost:5000


Swagger docs:

http://localhost:5000/api-docs

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

```
