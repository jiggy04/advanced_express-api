# AGENTS.md

## Purpose
This repository is a small Express.js backend API for articles and user authentication. Use this file to help AI coding agents understand the project shape, entry points, and conventions before editing code.

## Project overview
- Node.js backend using Express.js, Mongoose, Joi, bcrypt, jsonwebtoken, and dotenv.
- CommonJS module format (`type: commonjs` in `package.json`).
- No frontend; all code is backend API logic.
- No tests or README currently present.

## Startup commands
- `npm start` — run `node index.js`.
- `npm run dev` — run `nodemon index.js`.

## Environment requirements
- `process.env.PORT` — server port.
- `process.env.MongoDB_URI` — MongoDB connection string.
- `process.env.JWT_SECRET` — JWT signing secret.

## Key files and structure
- `index.js` — app entry point, loads `.env`, connects to DB, starts server.
- `src/app.js` — Express app configuration, middleware, and route mounting.
- `src/config/connectDB.js` — MongoDB connection helper.
- `src/controllers/` — business logic for articles and user auth.
- `src/routes/` — route definitions for article and user endpoints.
- `src/models/` — Mongoose schemas for `Article` and `User`.
- `src/middlewares/` — request logger, auth guards, and error handling.
- `src/validation/` — Joi schemas for request payload validation.
- `src/utils/bcrypt` — password hashing helper.

## API conventions
- Article routes use `/api/articles` and are protected by `requireAuth`.
- User routes use `/api/users/sign-up` and `/api/users/login`.
- Controllers return JSON responses with `message` and `data` when applicable.
- Errors are passed to centralized `errorHandler` middleware.
- Article update/delete actions require ownership through `owner.auth`.

## Coding guidance for AI agents
- Keep changes in CommonJS style; do not migrate to ES modules unless explicitly requested.
- Preserve existing route and response shape unless fixing a bug or adding a compatible feature.
- Keep authentication logic using JWT and password hashing.
- Prefer small, targeted edits; do not introduce unnecessary packages or architecture changes.
- Avoid adding frontend or UI concerns.

## Notes
- There is no `README.md`; use this file as the primary agent guidance.
- Use the existing project layout when adding new features or files.
