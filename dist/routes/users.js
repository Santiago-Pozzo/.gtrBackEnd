"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validateJWT_1 = require("../middelwares/validateJWT");
const isAdmin_1 = require("../middelwares/isAdmin");
const recollectErrors_1 = require("../middelwares/recollectErrors");
const isVerifiedUser_1 = require("../middelwares/isVerifiedUser");
const express_validator_1 = require("express-validator");
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
router.put('/update-user-data/name/', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    (0, express_validator_1.check)("nombre", "El campo nombre es obligatorio").not().isEmpty(),
    recollectErrors_1.recollectErrors
], user_1.updateUserName); //Necesita recibir el token en el header y la info del user en el body
router.put('/update-user-data/last-name/', [
    validateJWT_1.validateJWT,
    isVerifiedUser_1.isVerifiedUser,
    (0, express_validator_1.check)("apellido", "El campo apellido es obligatorio").not().isEmpty(),
    recollectErrors_1.recollectErrors
], user_1.updateUserLastName); //Necesita recibir el token en el header y la info del user en el body    
router.delete('/:email', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], user_1.hardDeleteUser);
router.put('/softDelete/:email', user_1.softDeleteUser);
router.put('/restore/:email', user_1.restoreUser);
exports.default = router;
//# sourceMappingURL=users.js.map