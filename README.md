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

The project includes OpenTelemetry instrumentation with Prometheus exporter for metrics collection.

### Configuration

OpenTelemetry is automatically initialized when the application starts. Configure it using environment variables:

- `PROMETHEUS_PORT` - Port for Prometheus metrics endpoint (default: `9464`)
- `MONITORING_PRECISION` - Monitoring precision in milliseconds (default: `5000`)

### Prometheus Metrics

Metrics are exposed at: `http://localhost:9464/metrics`

The runtime instrumentation captures Node.js runtime metrics including:
- Garbage collection events
- Event loop utilization
- Memory usage
- CPU usage

### Example Usage

```bash
# Run with default Prometheus port (9464)
npm run start:dev

# Run with custom Prometheus port
PROMETHEUS_PORT=9464 MONITORING_PRECISION=5000 npm run start:dev
```

### Accessing Metrics

Once the application is running, you can access Prometheus metrics at:
```
http://localhost:9464/metrics
```

This endpoint can be scraped by Prometheus or any other monitoring system that supports Prometheus format.

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

