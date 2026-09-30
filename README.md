# Expense Tracker

Course project for Web Software Production.

- `client/` — React + Vite + TypeScript frontend
- `server/` — Node + Express + TypeScript backend
- `db/` — PostgreSQL database initialization

Each part is an independent npm project with its own `node_modules` and Biome configuration.

## Running

### Database

The application uses PostgreSQL for persistent storage.

Start the database from the project root:

```bash
docker compose up -d db
```

Check that it is running:

```bash
docker compose ps
```

The database schema is initialized from:

```text
db/init/001-schema.sql
```

### Server

The server runs at:

```text
http://localhost:3001
```

From `server/`:

```bash
npm install
npm run dev
```

The server reads its PostgreSQL connection settings from environment variables.

For local development, these are provided through `server/.env`.

The `.env` file is git-ignored and must not be committed.

The server structure includes:

```text
src/
  app.ts                     # configures the Express app
  server.ts                  # starts the HTTP server
  db/
    pool.ts                  # PostgreSQL connection pool
  types/
    expense.ts
    category.ts
  store/
    expense.ts               # PostgreSQL expense operations
    category.ts              # PostgreSQL category operations
  routes/
    expense.ts               # expense API routes
    category.ts              # category API routes
```

The application stores expenses and categories in PostgreSQL. Database access is handled through the connection pool in `src/db/pool.ts`, configured using environment variables.

### Expense API

Available endpoints under `/api/expenses`:

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/api/expenses` | List all expenses |
| POST | `/api/expenses` | Create an expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |

`POST` and `PUT` expect a JSON body containing:

- `description` — string
- `amount` — number
- `date` — ISO date string, for example `2026-08-01`

Invalid input returns `400`.

Updating or deleting an unknown ID returns `404`.

Example:

```bash
curl http://localhost:3001/api/expenses
```

### Category API

Available endpoints under `/api/categories`:

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/api/categories` | List all categories |
| POST | `/api/categories` | Create a category |
| PUT | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |

A category contains a `name` string.

Invalid input returns `400`.

Updating or deleting an unknown ID returns `404`.

### Client

The client development server runs at:

```text
http://localhost:5173
```

From `client/`:

```bash
npm install
npm run dev
```

The Vite development server uses hot reload and communicates with the API at `http://localhost:3001`.

The UI is split by responsibility:

```text
src/
  types/
  api/
  hooks/
  utils/
  components/
  App.tsx
```

## Testing

The server contains both unit tests and integration tests.

Unit tests cover pure application logic such as:

- converting PostgreSQL expense data into API expense objects
- validating expense request bodies
- validating category request bodies

Integration tests exercise the Express API against a real PostgreSQL database.

Tests use a separate database:

```text
app_test_db
```

This keeps test operations separate from the development database.

Before running the server tests, start PostgreSQL:

```bash
docker compose up -d db
```

Then, from `server/`:

```bash
npm test
```

Other available test commands:

```bash
npm run test:watch
npm run test:coverage
```

The test database must contain the same schema as the development database.

### End-to-end tests

The client contains end-to-end tests using Playwright.

The E2E suite drives a real Chromium browser against the running application and tests the complete stack: client, server, and PostgreSQL database.

Start the full application stack from the project root:

```bash
docker compose up -d

## Linting

[Biome](https://biomejs.dev/) handles linting and formatting.

`client/` and `server/` each have their own `biome.json`.

Run from inside either project:

```bash
npm run lint
npm run lint:fix
```

`lint:fix` applies fixes that can be performed safely and reports remaining problems that require manual changes.
