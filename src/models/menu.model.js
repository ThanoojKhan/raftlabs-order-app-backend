const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        image: {
            type: String,
            required: true,
            trim: true,
            match: /^https?:\/\/.+/, // basic URL validation
        },

        isAvailable: {
            type: Boolean,
            default: true,
            index: true, // optimize queries
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Menu", menuSchema);