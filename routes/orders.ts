import { Router } from "express";
import { getAllOrders, getUserOrdersByEmail, getUserOrdersByID, softDeleteOrder, newOrder, getOrderByID, restoreOrder, hardDeleteOrder, getUserOrders } from "../controllers/order";
import { validateJWT } from "../middelwares/validateJWT";
import { recollectErrors } from "../middelwares/recollectErrors";
import { isVerifiedUser } from "../middelwares/isVerifiedUser";
import { check } from "express-validator";

const router = Router();


router.post('/', [
        validateJWT, //este middelware recibe el token en el header y, si todo es correcto, envía en el body la info del user
        isVerifiedUser, 
        check("arrayProductos", "El array de productos es obligatorio").not().isEmpty(),
        check("precioTotalAlComprar", "El precio de compra toal es obligatorio").not().isEmpty(),
        recollectErrors   
        ] ,newOrder);

router.get('/', [
        validateJWT, //este middelware recibe el token en el header y, si todo es correcto, envía en el body la info del user
        recollectErrors,
        ], getUserOrders);

router.get('/', getAllOrders);

router.get('/:orderID',getOrderByID);

router.get('/get-user-orders-by-email/:userEmail', getUserOrdersByEmail);

router.get('/get-orders-by-ID/:userID', getUserOrdersByID);

router.put('/soft-delete-order/:orderID', softDeleteOrder);

router.put('/restore/:orderID', restoreOrder);

router.delete('/hard-delete-order/:orderID', hardDeleteOrder);


export default router;