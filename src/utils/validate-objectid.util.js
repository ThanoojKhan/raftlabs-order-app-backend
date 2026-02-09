const mongoose = require("mongoose");
const AppError = require("./app-error.util");

const validateObjectId = (id, fieldName = "ID") => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError({
            statusCode: 400,
            message: `Invalid ${fieldName}`,
        });
    }
};

module.exports = validateObjectId;