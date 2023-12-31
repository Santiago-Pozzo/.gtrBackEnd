"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../controllers/order");
const router = (0, express_1.Router)();
router.post('/', order_1.newOrder);
router.get('/', order_1.getAllOrders);
router.get('/:orderID', order_1.getOrderByID);
router.get('/getOrdersByUserEmail/:userEmail', order_1.getUserOrdersByEmail);
router.get('/getOrdersByUserID/:userID', order_1.getUserOrdersByID);
router.put('/softDelete/:orderID', order_1.softDeleteOrder);
router.put('/restore/:orderID', order_1.restoreOrder);
router.delete('/:orderID', order_1.hardDeleteOrder);
exports.default = router;
//# sourceMappingURL=orders.js.map