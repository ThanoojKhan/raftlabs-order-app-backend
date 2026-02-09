class AppError extends Error {
    constructor({ name, statusCode, message, error, isOperational }) {
        super(message);

        this.name = name || 'Error';
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;

        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;