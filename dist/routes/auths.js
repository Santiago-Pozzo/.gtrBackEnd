"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const validations_1 = require("../helpers/validations");
const recollectErrors_1 = require("../middelwares/recollectErrors");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("apellido", "El apellido es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "Ingrese un email válido").isEmail(),
    (0, express_validator_1.check)("email").custom(validations_1.isRegisteredEmail),
    (0, express_validator_1.check)("contraseña", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }), //ver mas condiciones de contraseña
    recollectErrors_1.recollectErrors, //Este middelware va a recibir en su req las respuestas de todos los checks anteriores para ver si hay errores (ver archivo donde está definida este metodo)
], auth_1.register);
router.post('/login', [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "Ingrese un email válido").isEmail(),
    recollectErrors_1.recollectErrors,
], auth_1.login);
exports.default = router;
//# sourceMappingURL=auths.js.map