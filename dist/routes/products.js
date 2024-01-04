"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const product_1 = require("../controllers/product");
const validateJWT_1 = require("../middelwares/validateJWT");
const isVerifiedUser_1 = require("../middelwares/isVerifiedUser");
const isAdmin_1 = require("../middelwares/isAdmin");
const recollectErrors_1 = require("../middelwares/recollectErrors");
const router = (0, express_1.Router)();
router.post('/', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isAdmin_1.isAdmin,
    (0, express_validator_1.check)("id_producto", "El id_producto es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("categoria", "La categoria es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("marca", "La marca es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("modelo", "El modelo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("precio", "El precio es obligatorio").not().isEmpty(),
    recollectErrors_1.recollectErrors
], product_1.newProduct); //Recibe en el header el token (debe ser admin) y en el body la info del producto
router.get('/', product_1.getProducts);
router.put('/update/id_producto/:id_producto', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isAdmin_1.isAdmin,
    (0, express_validator_1.check)("id_producto", "El id_producto es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("categoria", "La categoria es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("marca", "La marca es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("modelo", "El modelo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("precio", "El precio es obligatorio").not().isEmpty(),
    recollectErrors_1.recollectErrors
], product_1.updateProduct); //Recibe en el header el token (admin) y en el body toda la información del producto (mejorar: que no sea necesario mandar toda la data y que se actualicen solo los campos enviados en el body)
router.get('/get-product/id_producto/:id_producto', product_1.getProductByID);
router.delete('/hard-delete/id_producto/:id_producto', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], product_1.hardDeleteProduct); //Recibe el token en el header (admin) y el id_producto por params
router.patch('/soft-delete/id_producto/:id_producto', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], product_1.softDeleteProduct); //Recibe el token en el header (admin) y el id_producto por params
router.patch('/restore/id_producto/:id_producto', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], product_1.restoreProduct); //Recibe el token en el header (admin) y el id_producto por params
exports.default = router;
//# sourceMappingURL=products.js.map