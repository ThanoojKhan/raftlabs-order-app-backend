const AppError = require("../utils/app-error.util");

const validate = (schema) => (req, _res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        const message = error.issues?.[0]?.message || "Invalid request data";

        next(
            new AppError({ statusCode: 400, message })
        );
    }
};

module.exports = validate;