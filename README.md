# Todo List API

A simple RESTful API for managing a todo list, built with Node.js and Express. This API allows users to create, read, update, and delete todo items, making it easy to keep track of tasks.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create new todo items
- Retrieve a list of all todo items
- Update existing todo items
- Delete todo items
- Mark todo items as complete

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma
- Bcrypt
- JSONWebToken
- Docker

## Installation

To run the API using Docker, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/JovanMihic99/todo_list_api.git
```

### 2. Navigate to the project directory:

```bash
cd todo_list_api
```

### 3. Create a `.env` file:

In the root directory of the project, create a `.env` file to store your environment variables. The `.env` file should contain the following configuration:

```env
DATABASE_HOST=postgresql-db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=todo_list_app

DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}

ACCESS_TOKEN_SECRET=[Your JWT secret]
REFRESH_TOKEN_SECRET=[Your Refresh Token secret]
```

You can customize the values (such as `DATABASE_USER`, `DATABASE_PASSWORD`, etc.) if you have a different setup.

### 4. Build the Docker image:

```bash
docker build -t todo_list_api .
```

### 5. Run the Docker image:

```bash
docker compose up --build
```

The API will be running on `http://localhost:3000` (or the port you’ve configured).

The API documentation can be accessed at `http://localhost:3000/api-docs/`.
