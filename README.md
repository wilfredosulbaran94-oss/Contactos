# Contacts API

A simple NestJS CRUD API for managing contacts using SQLite database.

## Features

- Create, Read, Update, and Delete contacts
- SQLite database for data persistence
- RESTful API endpoints

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Create a Contact
```bash
POST /contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

### Get All Contacts
```bash
GET /contacts
```

### Get a Contact by ID
```bash
GET /contacts/:id
```

### Update a Contact
```bash
PATCH /contacts/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### Delete a Contact
```bash
DELETE /contacts/:id
```

## Contact Fields

- `id` (number, auto-generated)
- `name` (string, required)
- `email` (string, required)
- `phone` (string, optional)
- `address` (string, optional)

## Database

The SQLite database file (`contacts.db`) will be created automatically in the project root when you first run the application.

