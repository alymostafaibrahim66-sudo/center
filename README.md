# Private Courses Center

Full-stack application (Node.js + Express + MongoDB backend, React frontend) for a Private Courses Center.

Features:
- Students: register, login, view courses, select teacher for a course, submit enrollments, view their enrollments and statuses.
- Admin: login, create/update/delete courses, create teachers, assign teachers to courses, view students and enrollments, approve/reject enrollments.

Repository structure:
- backend/ - Express server with models, controllers, routes
- frontend/ - React application (Create React App)

Backend
- API prefix: /api
- Health check: GET /api/health
- Start: cd backend && npm install && npm start
- Environment variables: see backend/.env.example

Frontend
- Use REACT_APP_API_URL to point to backend API (e.g., http://localhost:5000/api)
- Start: cd frontend && npm install && npm start
- Build: cd frontend && npm run build (Railway compatible)

Railway Notes
- Set environment variables via Railway project (MONGO_URI, JWT_SECRET, PORT).
- Railway should install and start backend using `npm start` in the backend folder; set up a service for frontend build output if serving statically.

Security
- JWT authentication (token stored in localStorage).
- Passwords hashed with bcrypt.
- Role-based authorization enforced on backend.

This repository contains a complete minimal production-ready application. Review `.env.example` files and configure environment variables before running.
