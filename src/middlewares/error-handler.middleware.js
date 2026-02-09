const ENV = require("../config/env");

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;

    // Hide internal messages in production for unknown errors
    const message =
        statusCode === 500 && ENV.NODE_ENV === "production"
            ? "Internal Server Error"
            : err.message || "Internal Server Error";

    const response = {
        success: false,
        message,
    };

    // Include stack only in development
    if (ENV.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

module.exports = errorHandler;