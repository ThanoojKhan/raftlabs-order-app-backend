const { z } = require("zod");

const orderItemSchema = z.object({
    menuItem: z
        .string({
            required_error: "Menu item is required",
            invalid_type_error: "Menu item must be a string",
        })
        .min(1, "Menu item is required"),

    quantity: z
        .number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number",
        })
        .int("Quantity must be an integer")
        .positive("Quantity must be greater than 0"),
});

exports.createOrderSchema = z.object({
    items: z
        .array(orderItemSchema, {
            required_error: "Items are required",
            invalid_type_error: "Items must be an array",
        })
        .min(1, "Order must contain at least one item"),

    customerName: z
        .string({ required_error: "Customer name is required" })
        .trim()
        .min(2, "Customer name must be at least 2 characters"),

    address: z
        .string({ required_error: "Address is required" })
        .trim()
        .min(5, "Address is too short"),

    phone: z
        .string({ required_error: "Phone number is required" })
        .trim()
        .min(8, "Phone number is too short")
        .max(15, "Phone number is too long"),
});