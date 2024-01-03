import { Router } from "express";
import { getUserByEmail, getUsers, hardDeleteUser, restoreUser, softDeleteUser, updateUserLastName, updateUserName } from "../controllers/user";
import { validateJWT } from "../middelwares/validateJWT";
import { isAdmin } from "../middelwares/isAdmin";
import { recollectErrors } from "../middelwares/recollectErrors";
import { isVerifiedUser } from "../middelwares/isVerifiedUser";
import { check } from "express-validator";
import { isRegisteredEmail } from "../helpers/validations";
import { setNewUserData } from "../middelwares/updateUser";

const router = Router();

router.get('/', [
    validateJWT,
    isAdmin,
    recollectErrors
    ],getUsers); //Necesita recibir el token en el header de la reuest

router.get('/:email', [
    validateJWT,
    isAdmin,
    recollectErrors
    ], getUserByEmail); //Recibimos email desde los params 

router.put('/update-user-data/name/', [
    validateJWT,
    isVerifiedUser,
    check("nombre", "El campo nombre es obligatorio").not().isEmpty(),
    recollectErrors
    ], updateUserName); //Necesita recibir el token en el header y la info del user en el body

router.put('/update-user-data/last-name/', [
    validateJWT,
    isVerifiedUser,
    check("apellido", "El campo apellido es obligatorio").not().isEmpty(),
    recollectErrors
    ], updateUserLastName); //Necesita recibir el token en el header y la info del user en el body    

router.delete('/:email', [
    validateJWT,
    isAdmin,
    recollectErrors
    ], hardDeleteUser);
    
router.put('/softDelete/:email', softDeleteUser);
router.put('/restore/:email', restoreUser);

export default router;