const { Router } = require("express");
const router = Router();

// Controllers
const orderController = require("../controllers/order.controller");

// Validation
const validateRequest = require("../middlewares/validate.middleware");
const { createOrderSchema } = require("../validations/order.validation");


router
    .route('/')
    .get(orderController.fetchAllOrders)
    .post(validateRequest(createOrderSchema), orderController.placeOrder);

router
    .route('/:id')
    .get(orderController.getOrder);

module.exports = router;