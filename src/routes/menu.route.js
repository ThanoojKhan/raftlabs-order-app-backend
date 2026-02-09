const { Router } = require("express");
const router = Router();

const menuController = require("../controllers/menu.controller");

router
    .route('/')
    .get(menuController.fetchMenuItems)
    // .post(menuController.createMenu);

module.exports = router;