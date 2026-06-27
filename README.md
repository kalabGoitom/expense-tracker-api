# Expense Tracker API

A RESTful backend API for tracking income and expenses. Built with Node.js, Express, Prisma, PostgreSQL, JWT authentication, and Zod validation.

## Features

- User signup and login
- JWT authentication using HTTP-only cookies
- Create, read, update, and delete expense records
- Separate income and expense tracking
- User-specific expense access
- Summary endpoint for total income, total expenses, and balance
- Request validation with Zod
- PostgreSQL database integration with Prisma

## Tech Stack

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Zod
- JSON Web Token
- bcryptjs
- cookie-parser

## Project Structure

```txt
expense-tracker/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.js
│   │   └── expense.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── validateRequest.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── expense.js
│   ├── utilties/
│   │   └── generateToken.js
│   ├── validiators/
│   │   ├── auth.js
│   │   └── expense.js
│   └── app.js
├── package.json
└── prisma.config.ts
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/expense_tracker"
JWT_SECRET="your_jwt_secret"
EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the server

```bash
npm start
```

The server will run on:

```txt
http://localhost:5000
```

## API Endpoints

### Auth Routes

Base path:

```txt
/auth
```

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/signup` | Register a new user | No |
| POST | `/login` | Login user | No |
| POST | `/logout` | Logout user | Yes |
| DELETE | `/deleteAccount` | Delete user account | Yes |

### Expense Routes

Base path:

```txt
/expenses
```

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/` | Create an expense record | Yes |
| GET | `/` | Get all expense records for the logged-in user | Yes |
| GET | `/summery` | Get income, expense, and balance summary | Yes |
| GET | `/:id` | Get one expense record | Yes |
| PATCH | `/:id` | Update an expense record | Yes |
| DELETE | `/:id` | Delete one expense record | Yes |
| DELETE | `/` | Delete all expense records for the logged-in user | Yes |

## Example Requests

### Signup

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Expense

```json
{
  "description": "Groceries",
  "amount": 2500,
  "type": "EXPENSE"
}
```

### Create Income

```json
{
  "description": "Salary",
  "amount": 50000,
  "type": "INCOME"
}
```

## Prisma Models

The project has two main models:

- `User`: stores account information and hashed passwords
- `Expense`: stores income and expense records connected to a user

Expense records use the following type enum:

```prisma
enum ExpenseType {
  INCOME
  EXPENSE
}
```

## Notes Before Deployment

- Keep `.env` out of GitHub.
- Use a strong `JWT_SECRET` in production.
- Set `NODE_ENV=production` when deployed.
- Use a hosted PostgreSQL database for production.
- Consider adding pagination and filtering to `GET /expenses`.
- Consider adding automated tests before production use.

## License

This project is licensed under the ISC License.
