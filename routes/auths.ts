import { Router } from "express";
import { login, register } from "../controllers/auth";
import { check } from "express-validator";
import { isRegisteredEmail } from "../helpers/validations";
import { recollectErrors } from "../middelwares/recollectErrors";

const router = Router();

router.post('/register',[

        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("apellido", "El apellido es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").not().isEmpty(),
        check("email", "Ingrese un email válido").isEmail(),
        check("email").custom(isRegisteredEmail),
        check("contraseña", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }), //ver mas condiciones de contraseña
        recollectErrors, //Este middelware va a recibir en su req las respuestas de todos los checks anteriores para ver si hay errores (ver archivo donde está definida este metodo)

      ], register);

router.post('/login',[

        check("email", "El email es obligatorio").not().isEmpty(),
        check("email", "Ingrese un email válido").isEmail(),     
        recollectErrors,

      ], login);

export default router