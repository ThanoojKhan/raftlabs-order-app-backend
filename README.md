# RaftLabs Order App --- Backend

Production-ready Node.js backend for a simple food ordering system.\
Implements menu retrieval, order creation, order status simulation,
validation, error handling and automated tests.

------------------------------------------------------------------------

## Tech Stack

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   Zod (request validation)
-   Jest + Supertest (API testing)
-   Envalid (environment validation)

------------------------------------------------------------------------

## Features

### Menu

-   Fetch available menu items
-   Sorted by latest created

### Orders

-   Create order with validation
-   Snapshot menu name and price at purchase time
-   Quantity limits enforced
-   Total amount calculation
-   Fetch order by ID
-   Simulated status progression:
    -   `ORDER_RECEIVED`
    -   `PREPARING`
    -   `OUT_FOR_DELIVERY`

### Validation

-   Zod schema validation for request payloads
-   Business validation in service layer
-   ObjectId validation utility

### Error Handling

-   Centralized error middleware
-   Structured operational errors
-   Safe HTTP responses

### Production Readiness

-   Graceful shutdown (SIGINT and SIGTERM)
-   Environment-based DB selection
-   Clean layered architecture

### Testing

Automated API tests covering:

-   Order creation success
-   Validation failure
-   Fetch order by ID
-   Order status transition flow

Tests run against **separate test database**.

------------------------------------------------------------------------

## Project Structure

    src/
      config/        # env validation, DB connection, seed
      controllers/   # request handlers
      middlewares/   # error and validation middleware
      models/        # Mongoose schemas
      routes/        # Express routes
      services/      # business logic
      tests/         # Jest + Supertest tests
      utils/         # helpers and error classes
      validations/   # Zod schemas
      app.js         # Express app
      server.js      # server bootstrap and shutdown

------------------------------------------------------------------------

## Environment Variables

Create `.env` in project root:

    NODE_ENV=
    MONGODB_URI=
    PORT=
    MAX_QUANTITY_PER_ITEM=

Provide `.env.test` for test.

------------------------------------------------------------------------

## Installation

``` bash
npm install
```

------------------------------------------------------------------------

## Run Server

``` bash
npm run dev
```

Server starts at:

    http://localhost:3000

Health check:

    GET /health

------------------------------------------------------------------------

## Run Tests

``` bash
npm test
```

-   Uses **test database**
-   Cleans data after execution
-   No background timers in test environment

------------------------------------------------------------------------

## API Endpoints

### Menu

    GET /api/menu

------------------------------------------------------------------------

### Orders

    POST /api/orders
    GET  /api/orders/:id

Example create payload:

``` json
{
  "items": [{ "menuItem": "<menuId>", "quantity": 2 }],
  "customerName": "Thanu",
  "address": "Kochi Kerala",
  "phone": "9999999999"
}
```

------------------------------------------------------------------------

## Order Status Simulation

After order creation:

-   Status automatically progresses in background
-   Disabled during tests for deterministic execution

------------------------------------------------------------------------

## Design Decisions

-   **Service layer separation** for business logic clarity
-   **Snapshot pricing** to preserve historical accuracy
-   **Environment-safe testing** with isolated database
-   **Minimal but meaningful test coverage** aligned with task scope
-   **Graceful shutdown** for production safety

------------------------------------------------------------------------

## Future Improvements

-   Authentication and authorization
-   Pagination and filtering for menu and orders
-   Real-time updates via WebSockets
-   Docker and CI pipeline
-   Expanded test coverage

------------------------------------------------------------------------

## Author

**Thanooj**