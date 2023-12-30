"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const router = (0, express_1.Router)();
router.post('/', product_1.newProduct);
router.get('/', product_1.getProducts);
router.put('/:id_producto', product_1.updateProduct);
router.get('/:id_producto', product_1.getProductByID);
router.delete('/:id_producto', product_1.hardDeleteProduct);
router.put('/softDelete/:id_producto', product_1.softDeleteProduct);
router.put('/restore/:id_producto', product_1.restoreProduct);
exports.default = router;
//# sourceMappingURL=products.js.map