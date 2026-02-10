const catchAsync = require("../utils/async-handler.util");
const { createOrder, getOrderById, getAllOrders } = require("../services/order.service");


// Place a new order
exports.placeOrder = catchAsync(async (req, res) => {
    const { orderId } = await createOrder(req.body);

    res.status(201).json({
        success: true,
        message: "Order placed successfully",
        orderId,
    });
});


// Get all orders
exports.fetchAllOrders = catchAsync(async (_req, res) => {
    const orders = await getAllOrders();

    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
    });
});


// Get a single order by ID
exports.getOrder = catchAsync(async (req, res) => {
    const { order } = await getOrderById(req.params.id);

    res.status(200).json({
        success: true,
        order,
    });
});