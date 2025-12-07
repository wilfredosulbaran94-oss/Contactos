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

## API Documentation

Swagger documentation is available at: **http://localhost:3000/api**

You can explore and test all API endpoints interactively through the Swagger UI.

## API Endpoints

### Health Check
```bash
GET /health
```

Returns the application health status including:
- `status`: Application status (`ok` or `error`)
- `timestamp`: Current timestamp
- `uptime`: Application uptime in seconds
- `database`: Database connection status (`connected` or `disconnected`)

Example response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 3600,
  "database": "connected"
}
```

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

## OpenTelemetry

The project includes OpenTelemetry instrumentation for distributed tracing and observability.

### Configuration

OpenTelemetry is automatically initialized when the application starts. Configure it using environment variables:

- `SERVICE_NAME` - Name of the service (default: `contactos-api`)
- `SERVICE_VERSION` - Version of the service (default: `1.0.0`)
- `OTEL_EXPORTER_OTLP_ENDPOINT` - OTLP endpoint URL (optional, if not set, traces won't be exported)

### Example Usage

```bash
# Run with OpenTelemetry exporting to a collector
SERVICE_NAME=contactos-api \
SERVICE_VERSION=1.0.0 \
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318/v1/traces \
npm run start:dev
```

### Supported Instrumentations

The following are automatically instrumented:
- HTTP requests (Express)
- Database queries (TypeORM)
- System metrics
- And more via `@opentelemetry/auto-instrumentations-node`

## Docker

### Prerequisites

Make sure Docker is running on your machine:
```bash
# Check if Docker is running
docker ps
```

### Build the Docker Image

```bash
docker build -t contactos .
```

### Run with Docker

```bash
# Run the container
docker run -p 3000:3000 -v $(pwd)/data:/app/data contactos
```

### Run with Docker Compose

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

The database will be persisted in the `./data` directory on your host machine.

