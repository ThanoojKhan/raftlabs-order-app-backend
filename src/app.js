const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const globalErrorHandler = require("./middlewares/error-handler.middleware");
const AppError = require("./utils/app-error.util");
const ENV = require("./config/env");

const app = express();

app.use(cors(
  {
    origin: ENV.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
));
app.use(express.json());
if (ENV.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ message: "OK" });
});

// Routes
app.use('/api/menu', require('./routes/menu.route'));
app.use('/api/orders', require('./routes/order.route'));

// 404 handler
app.use((req, res, next) => {
  next(new AppError({ statusCode: 404, message: "Route not found" }));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;