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
- Typescript
- Express.js
- Docker
- PostgreSQL
- Prisma
- Bcrypt
- JSONWebToken

## Installation

To run the API using Docker:

1. Clone the repository:
   ```bash
   git clone https://github.com/JovanMihic99/todo_list_api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd todo_list_api
   ```
3. Build the Docker image:
   ```bash
   docker build -t todo_list_api .
   ```
4. Run the Docker image:
   ```bash
   docker compose up --build
   The API will be running on `http://localhost:3000` (or the port you've configured).
   The API docs can be found at `http://localhost:3000/api-docs/`
   ```
