const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        items: {
            type: [orderItemSchema],
            required: true,
            validate: [(val) => val.length > 0, "Order must contain at least one item"],
        },

        customerName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        address: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            maxlength: 15,
        },

        status: {
            type: String,
            enum: ["ORDER_RECEIVED", "PREPARING", "OUT_FOR_DELIVERY"],
            default: "ORDER_RECEIVED",
            index: true,
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);