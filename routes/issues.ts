import { Router  } from "express";
import { newIssue } from "../controllers/issue";
import { validateJWT } from "../middelwares/validateJWT";
import { isAdmin } from "../middelwares/isAdmin";
import { check } from "express-validator";
import { recollectErrors } from "../middelwares/recollectErrors";

const router = Router();

router.post('/', [
    validateJWT,
    isAdmin,
    check("titulo", "El título es obligatorio").not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").not().isEmpty(),
    check("prioridad", "La prioridad es obligatoria").not().isEmpty(),
    recollectErrors
    ], newIssue);

export default router;