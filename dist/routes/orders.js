"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../controllers/order");
const validateJWT_1 = require("../middelwares/validateJWT");
const recollectErrors_1 = require("../middelwares/recollectErrors");
const isVerifiedUser_1 = require("../middelwares/isVerifiedUser");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post('/', [
    validateJWT_1.validateJWT, //este middelware recibe el token en el header y, si todo es correcto, envía en el body la info del user
    isVerifiedUser_1.isVerifiedUser,
    (0, express_validator_1.check)("arrayProductos", "El array de productos es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("precioTotalAlComprar", "El precio de compra toal es obligatorio").not().isEmpty(),
    recollectErrors_1.recollectErrors
], order_1.newOrder);
router.get('/', [
    validateJWT_1.validateJWT, //este middelware recibe el token en el header y, si todo es correcto, envía en el body la info del user
    recollectErrors_1.recollectErrors,
], order_1.getUserOrders);
router.get('/', order_1.getAllOrders);
router.get('/:orderID', order_1.getOrderByID);
router.get('/get-user-orders-by-email/:userEmail', order_1.getUserOrdersByEmail);
router.get('/get-orders-by-ID/:userID', order_1.getUserOrdersByID);
router.put('/soft-delete-order/:orderID', order_1.softDeleteOrder);
router.put('/restore/:orderID', order_1.restoreOrder);
router.delete('/hard-delete-order/:orderID', order_1.hardDeleteOrder);
exports.default = router;
//# sourceMappingURL=orders.js.map