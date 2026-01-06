# Backend - Private Courses Center

This is the Express + MongoDB backend for the Private Courses Center.

Environment variables (.env):
- MONGO_URI - MongoDB connection string
- JWT_SECRET - secret for signing JWTs
- PORT - port to run the server (default 5000)

Scripts:
- npm start - start server (production)
- npm run dev - start server with nodemon (dev)

API prefix: /api

Health check: GET /api/health
