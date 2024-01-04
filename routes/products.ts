import { Router } from "express";
import { check } from "express-validator";
import { newProduct, getProducts, updateProduct, getProductByID, hardDeleteProduct, softDeleteProduct, restoreProduct } from "../controllers/product";
import { validateJWT } from "../middelwares/validateJWT";
import { isVerifiedUser } from "../middelwares/isVerifiedUser";
import { isAdmin } from "../middelwares/isAdmin";
import { recollectErrors } from "../middelwares/recollectErrors";
import { verifyUser } from "../controllers/auth";

const router = Router();

router.post('/', [
    validateJWT,
    isVerifiedUser,
    isAdmin,
    check("id_producto", "El id_producto es obligatorio").not().isEmpty(),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    check("marca", "La marca es obligatoria").not().isEmpty(),
    check("modelo", "El modelo es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    recollectErrors
    ], newProduct); //Recibe en el header el token (debe ser admin) y en el body la info del producto
    
router.get('/', getProducts);

router.put('/update/id_producto/:id_producto', [
    validateJWT,
    isVerifiedUser,
    isAdmin,
    check("id_producto", "El id_producto es obligatorio").not().isEmpty(),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    check("marca", "La marca es obligatoria").not().isEmpty(),
    check("modelo", "El modelo es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    recollectErrors
    ],updateProduct); //Recibe en el header el token (admin) y en el body toda la información del producto (mejorar: que no sea necesario mandar toda la data y que se actualicen solo los campos enviados en el body)

router.get('/get-product/id_producto/:id_producto', getProductByID);

router.delete('/hard-delete/id_producto/:id_producto', [
    validateJWT,
    isVerifiedUser,
    isAdmin,
    recollectErrors], 
    hardDeleteProduct); //Recibe el token en el header (admin) y el id_producto por params

router.patch('/soft-delete/id_producto/:id_producto', [
    validateJWT,
    isVerifiedUser,
    isAdmin,
    recollectErrors
    ],softDeleteProduct); //Recibe el token en el header (admin) y el id_producto por params

router.patch('/restore/id_producto/:id_producto', [
    validateJWT,
    isVerifiedUser,
    isAdmin,
    recollectErrors
    ],restoreProduct);   //Recibe el token en el header (admin) y el id_producto por params

export default router;