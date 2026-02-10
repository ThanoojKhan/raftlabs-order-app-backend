const Menu = require("../models/menu.model");
const AppError = require("../utils/app-error.util");

exports.getAllMenuItems = async () => {
    const menu = await Menu.find({}).sort({ createdAt: -1 });
    if (!menu) {
        throw new AppError({ statusCode: 404, message: "Menu items not found" });
    }
    return { menu };
};