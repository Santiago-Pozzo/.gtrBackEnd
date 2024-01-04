import { Router } from "express";
import { getUserByEmail, getUsers, hardDeleteUser, restorePassword, restoreUser, softDeleteUser, updateUserEmail, updateUserLastName, updateUserName, updateUserPass } from "../controllers/user";
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

router.patch('/update-user-data/name', [
    validateJWT,
    isVerifiedUser,
    check("nombre", "El campo nombre es obligatorio").not().isEmpty(),
    recollectErrors
    ], updateUserName); //Necesita recibir el token en el header y la info del user en el body

router.patch('/update-user-data/last-name', [
    validateJWT,
    isVerifiedUser,
    check("apellido", "El campo apellido es obligatorio").not().isEmpty(),
    recollectErrors
    ], updateUserLastName); //Necesita recibir el token en el header y la info del user en el body
    
router.put('/update-user-data/email/', [
    validateJWT,
    isVerifiedUser,
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "Ingrese un email válido").isEmail(),
    check("email").custom(isRegisteredEmail),
    recollectErrors
    ], updateUserEmail); //Necesita recibir el token en el header y la info del user en el body

router.patch('/update-user-data/password', [
    validateJWT,
    isVerifiedUser,
    check("contraseña", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }),
    recollectErrors
    ], updateUserPass); //Necesita recibir el token en el header y la info del user en el body

router.delete('/:email', [
    validateJWT,
    isAdmin,
    recollectErrors
    ], hardDeleteUser);//Necesita recibir el token en el header

router.put('/soft-delete', [
    validateJWT,
    isVerifiedUser,
    recollectErrors
    ],softDeleteUser);//Necesita recibir el token  en el header 

router.put('/restore-user', [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "Ingrese un email válido").isEmail(),
    check("contraseña", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }),
    recollectErrors
    ], restoreUser); //Necesita recibir mail y contraseña en el body 

router.put('/restore-password', [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "Ingrese un email válido").isEmail(),
    recollectErrors
    ], restorePassword) //Necesita recibir el token en el header y mail en el body



export default router;