const catchAsync = require("../utils/async-handler.util");
const { getAllMenuItems } = require("../services/menu.service");

// Get all menu items
exports.fetchMenuItems = catchAsync(async (_req, res) => {
    const menuItems = await getAllMenuItems();

    res.status(200).json({
        success: true,
        count: menuItems.length,
        data: menuItems,
    });
});