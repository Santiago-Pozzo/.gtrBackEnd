import { Router } from "express";
import { getAllOrders, getUserOrdersByEmail, getUserOrdersByID, softDeleteOrder, newOrder, getOrderByID, restoreOrder, hardDeleteOrder, getUserOrders } from "../controllers/order";
import { validateJWT } from "../middelwares/validateJWT";
import { recollectErrors } from "../middelwares/recollectErrors";
import { isVerifiedUser } from "../middelwares/isVerifiedUser";
import { check } from "express-validator";
import { isAdmin } from "../middelwares/isAdmin";
import { isActiveUser } from "../middelwares/isActiveUser";

const router = Router();

router.post('/', [
        validateJWT, //este middelware recibe el token en el header y, si todo es correcto, envía en el body la info del user
        isVerifiedUser, 
        isActiveUser,
        check("arrayProductos", "El array de productos es obligatorio").not().isEmpty(),
        check("precioTotalAlComprar", "El precio de compra toal es obligatorio").not().isEmpty(),
        recollectErrors   
        ] ,newOrder);

router.get('/', [
        validateJWT,
        isVerifiedUser, 
        isActiveUser, //este middelware recibe el token en el header y, si todo es correcto, envía en el body la info del user
        recollectErrors,
        ], getUserOrders);

router.get('/get-all', [
        validateJWT,
        isVerifiedUser,
        isAdmin
        ], getAllOrders); //Recibe el token (de admin) en el header

router.get('/get-order/orderID/:orderID', [
        validateJWT,
        isVerifiedUser,
        isAdmin
        ], getOrderByID);// Recibe el token (de admin) en el header y el ID de la orden por param

router.get('/get-user-orders/email/:userEmail', [
        validateJWT,
        isVerifiedUser,
        isAdmin
        ],getUserOrdersByEmail); // Recibe el token (de admin) en el header y el mail de usuario por param


export default router;