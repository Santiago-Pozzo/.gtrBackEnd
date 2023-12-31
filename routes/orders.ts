import { Router } from "express";
import { getAllOrders, getUserOrdersByEmail, getUserOrdersByID, softDeleteOrder, newOrder, getOrderByID, restoreOrder, hardDeleteOrder } from "../controllers/order";

const router = Router();

router.post('/', newOrder);
router.get('/', getAllOrders);
router.get('/:orderID',getOrderByID);
router.get('/getOrdersByUserEmail/:userEmail', getUserOrdersByEmail);
router.get('/getOrdersByUserID/:userID', getUserOrdersByID);
router.put('/softDelete/:orderID', softDeleteOrder);
router.put('/restore/:orderID', restoreOrder);
router.delete('/:orderID', hardDeleteOrder);


export default router;