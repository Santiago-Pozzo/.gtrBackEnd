import { Router } from "express";
import { login, register, setNewAdminByEmail, verifyUser } from "../controllers/auth";
import { check } from "express-validator";
import { isRegisteredEmail } from "../helpers/validations";
import { recollectErrors } from "../middelwares/recollectErrors";
import { validateJWT } from "../middelwares/validateJWT";
import { isVerifiedUser } from "../middelwares/isVerifiedUser";
import { isAdmin } from "../middelwares/isAdmin";

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

router.patch('/verify',[

  check("codigo", "El codigo es obligatorio").not().isEmpty(),
  check("email", "El email es obligatorio").not().isEmpty(),
  check("email", "Ingrese un email válido").isEmail(),     
  recollectErrors,

], verifyUser);

router.patch('/set-new-admin',[
  validateJWT,
  isVerifiedUser,
  isAdmin,
  check("email", "El email es obligatorio").not().isEmpty(),
  check("email", "Ingrese un email válido").isEmail(),     
  recollectErrors,
], setNewAdminByEmail); //Recibe el token (de administrador) en el header y el mail del usuario en el body

export default router