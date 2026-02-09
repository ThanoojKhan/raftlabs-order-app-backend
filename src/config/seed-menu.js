const mongoose = require("mongoose");
require("dotenv").config();
const ENV = require("./env");
const Menu = require("../models/menu.model");

const menuItems = [
    {
        name: "Margherita Pizza",
        description: "Classic cheese pizza with fresh tomato sauce",
        price: 299,
        image: "https://www.acouplecooks.com/wp-content/uploads/2022/10/Margherita-Pizza-082.jpg",
    },
    {
        name: "Veg Burger",
        description: "Crispy vegetable patty with lettuce and mayo",
        price: 149,
        image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/10/Secret-Veg-Cheeseburgers-c981dd6.jpg",
    },
    {
        name: "Chicken Burger",
        description: "Grilled chicken patty with cheese and sauce",
        price: 199,
        image: "https://i0.wp.com/flaevor.com/wp-content/uploads/2022/04/SambalFriedChickenBurger1.jpg?resize=1024%2C830&ssl=1",
    },
    {
        name: "French Fries",
        description: "Golden fried potato sticks with seasoning",
        price: 99,
        image: "https://static.vecteezy.com/system/resources/previews/059/561/663/large_2x/crispy-golden-potato-fries-seasoned-with-herbs-and-spices-photo.jpg",
    },
    {
        name: "Cold Coffee",
        description: "Chilled coffee blended with milk and ice cream",
        price: 129,
        image: "https://thelittlestcrumb.com/wp-content/uploads/iced-coffee-with-ice-cream-featured-image.jpg",
    },
    {
        name: "Chocolate Milkshake",
        description: "Creamy chocolate shake topped with whipped cream",
        price: 149,
        image: "https://iambaker.net/wp-content/uploads/2024/06/Chocolate-Shake-4.jpg",
    },
    {
        name: "Veg Sandwich",
        description: "Fresh vegetables layered between toasted bread",
        price: 129,
        image: "https://cdn.buymeacoffee.com/uploads/project_updates/2024/05/bb7b4aaad902322894b45ebbb42e68de.jpg",
        isAvailable: false, // Marked as unavailable to test filtering
    },
];

const seedMenu = async () => {
    try {
        await mongoose.connect(ENV.MONGODB_URI);

        await Menu.deleteMany();
        await Menu.insertMany(menuItems);

        console.log("Menu items seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
}

seedMenu();