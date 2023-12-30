import { Router } from "express";

import { newProduct, getProducts, updateProduct, getProductByID, hardDeleteProduct, softDeleteProduct, restoreProduct } from "../controllers/product";

const router = Router();

router.post('/', newProduct);
router.get('/', getProducts);
router.put('/:id_producto', updateProduct);
router.get('/:id_producto', getProductByID);
router.delete('/:id_producto', hardDeleteProduct);
router.put('/softDelete/:id_producto', softDeleteProduct);
router.put('/restore/:id_producto', restoreProduct);

export default router;