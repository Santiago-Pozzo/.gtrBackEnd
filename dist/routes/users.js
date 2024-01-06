"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validateJWT_1 = require("../middelwares/validateJWT");
const isAdmin_1 = require("../middelwares/isAdmin");
const recollectErrors_1 = require("../middelwares/recollectErrors");
const isVerifiedUser_1 = require("../middelwares/isVerifiedUser");
const express_validator_1 = require("express-validator");
const validations_1 = require("../helpers/validations");
const isActiveUser_1 = require("../middelwares/isActiveUser");
const router = (0, express_1.Router)();
router.get('/', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], user_1.getUsers); //Necesita recibir el token en el header de la reuest
router.get('/:email', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], user_1.getUserByEmail); //Recibimos email desde los params 
router.patch('/update-user-data/name', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isActiveUser_1.isActiveUser,
    (0, express_validator_1.check)("nombre", "El campo nombre es obligatorio").not().isEmpty(),
    recollectErrors_1.recollectErrors
], user_1.updateUserName); //Necesita recibir el token en el header y la info del user en el body
router.patch('/update-user-data/last-name', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isActiveUser_1.isActiveUser,
    (0, express_validator_1.check)("apellido", "El campo apellido es obligatorio").not().isEmpty(),
    recollectErrors_1.recollectErrors
], user_1.updateUserLastName); //Necesita recibir el token en el header y la info del user en el body
router.put('/update-user-data/email/', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isActiveUser_1.isActiveUser,
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "Ingrese un email válido").isEmail(),
    (0, express_validator_1.check)("email").custom(validations_1.isRegisteredEmail),
    recollectErrors_1.recollectErrors
], user_1.updateUserEmail); //Necesita recibir el token en el header y la info del user en el body
router.patch('/update-user-data/password', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isActiveUser_1.isActiveUser,
    (0, express_validator_1.check)("contraseña", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }),
    recollectErrors_1.recollectErrors
], user_1.updateUserPass); //Necesita recibir el token en el header y la info del user en el body
router.delete('/hard-delete/email/:email', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], user_1.hardDeleteUser); //Necesita recibir el token en el header
router.put('/soft-delete', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    isActiveUser_1.isActiveUser,
    recollectErrors_1.recollectErrors
], user_1.softDeleteUser); //Necesita recibir el token  en el header 
router.put('/restore-user', [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "Ingrese un email válido").isEmail(),
    (0, express_validator_1.check)("contraseña", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }),
    recollectErrors_1.recollectErrors
], user_1.restoreUser); //Necesita recibir mail y contraseña en el body 
router.put('/restore-password', [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "Ingrese un email válido").isEmail(),
    recollectErrors_1.recollectErrors
], user_1.restorePassword); //Necesita recibir el token en el header y mail en el body
exports.default = router;
//# sourceMappingURL=users.js.map