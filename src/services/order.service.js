const AppError = require("../utils/app-error.util");
const ENV = require("../config/env");

const Menu = require("../models/menu.model");
const Order = require("../models/order.model");
const validateObjectId = require("../utils/validate-objectid.util");

// Create a new order
exports.createOrder = async (data) => {
    const { items, customerName, address, phone } = data;
    const MAX_QUANTITY_PER_ITEM = ENV.MAX_QUANTITY_PER_ITEM;

    if (!items || items.length === 0) {
        throw new AppError({ statusCode: 400, message: "Order must contain at least one item" });
    }

    // Validate menu item IDs
    for (const item of items) {
        validateObjectId(item.menuItem, "menu item ID");
    }

    const menuIds = items.map((item) => item.menuItem);

    const menuItems = await Menu.find({
        _id: { $in: menuIds },
        isAvailable: true,
    });

    if (menuItems.length !== items.length) {
        throw new AppError({
            statusCode: 400,
            message: "Some menu items are invalid or unavailable",
        });
    }

    const menuMap = new Map(menuItems.map((m) => [m._id.toString(), m]));

    let totalAmount = 0;

    const orderItems = items.map((item) => {
        const menu = menuMap.get(item.menuItem);

        if (!menu) {
            throw new AppError({ statusCode: 400, message: "Invalid menu item" });
        }

        if (item.quantity > MAX_QUANTITY_PER_ITEM) {
            throw new AppError({ statusCode: 400, message: `Maximum quantity allowed per item is ${MAX_QUANTITY_PER_ITEM}` });
        }

        const itemTotal = menu.price * item.quantity;
        totalAmount += itemTotal;

        return {
            menuItem: menu._id,
            name: menu.name,
            price: menu.price,
            quantity: item.quantity,
        };
    });

    const order = await Order.create({
        items: orderItems,
        customerName,
        address,
        phone,
        totalAmount,
    });

    // Simulate order progress
    if (ENV.NODE_ENV !== "test") {
        simulateOrderProgress(order._id);
    }

    return { orderId: order._id };
};

// Simulate order progress
const simulateOrderProgress = (orderId) => {
    setTimeout(async () => {
        try {
            await Order.findByIdAndUpdate(orderId, { status: "PREPARING" });
        } catch (err) {
            console.error("Status update failed:", err.message);
        }
    }, 5000);

    setTimeout(async () => {
        try {
            await Order.findByIdAndUpdate(orderId, { status: "OUT_FOR_DELIVERY" });
        } catch (err) {
            console.error("Status update failed:", err.message);
        }
    }, 10000);
};


// Get all orders
exports.getAllOrders = async () => {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    if (!orders) {
        throw new AppError({ statusCode: 404, message: "Orders not found" });
    }
    return orders;
};


// Get order by ID
exports.getOrderById = async (orderId) => {
    validateObjectId(orderId, "order ID");

    const order = await Order.findById(orderId);

    if (!order) {
        throw new AppError({ statusCode: 404, message: "Order not found" });
    }

    return { order };
};