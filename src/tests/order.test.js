const request = require("supertest");
const app = require("../app");
const Menu = require("../models/menu.model");
const Order = require("../models/order.model");

let menuItemId;

beforeAll(async () => {
    // menu item for testing
    const menu = await Menu.create({
        name: "Test Pizza",
        description: "Test description",
        price: 100,
        image: "https://example.com/test.jpg",
        isAvailable: true,
    });

    menuItemId = menu._id.toString();
});

describe("Order API", () => {
    test("should create order successfully", async () => {
        const res = await request(app).post("/api/orders").send({
            items: [{ menuItem: menuItemId, quantity: 2 }],
            customerName: "Thanu",
            address: "Kochi Kerala",
            phone: "9999999999",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.totalAmount).toBe(200);
    });

    test("should fail when quantity is invalid", async () => {
        const res = await request(app).post("/api/orders").send({
            items: [{ menuItem: menuItemId, quantity: 0 }],
            customerName: "Thanu",
            address: "Kochi Kerala",
            phone: "9999999999",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    test("should fetch order by id", async () => {
        const order = await Order.findOne();

        const res = await request(app).get(`/api/orders/${order._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data._id).toBe(order._id.toString());
    });

    test("should allow status update flow", async () => {
        const order = await Order.findOne();

        // simulate preparing
        await Order.findByIdAndUpdate(order._id, { status: "PREPARING" });

        let updated = await Order.findById(order._id);
        expect(updated.status).toBe("PREPARING");

        // simulate out for delivery
        await Order.findByIdAndUpdate(order._id, { status: "OUT_FOR_DELIVERY" });

        updated = await Order.findById(order._id);
        expect(updated.status).toBe("OUT_FOR_DELIVERY");
    });
});