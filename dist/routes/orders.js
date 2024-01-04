"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../controllers/order");
const validateJWT_1 = require("../middelwares/validateJWT");
const recollectErrors_1 = require("../middelwares/recollectErrors");
const isVerifiedUser_1 = require("../middelwares/isVerifiedUser");
const express_validator_1 = require("express-validator");
const isAdmin_1 = require("../middelwares/isAdmin");
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
router.get('/get-all', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isAdmin_1.isAdmin
], order_1.getAllOrders); //Recibe el token (de admin) en el header
router.get('/get-order/orderID/:orderID', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isAdmin_1.isAdmin
], order_1.getOrderByID); // Recibe el token (de admin) en el header y el ID de la orden por param
router.get('/get-user-orders/email/:userEmail', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isAdmin_1.isAdmin
], order_1.getUserOrdersByEmail); // Recibe el token (de admin) en el header y el mail de usuario por param
exports.default = router;
//# sourceMappingURL=orders.js.map