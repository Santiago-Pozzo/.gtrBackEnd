import { Router  } from "express";
import { deleteIssueByID, getAllIssues, getIssueByID, getIssuesByPriority, getPendingIssues, getResolvedIssues, newIssue, solveIssueByID } from "../controllers/issue";
import { validateJWT } from "../middelwares/validateJWT";
import { isAdmin } from "../middelwares/isAdmin";
import { check } from "express-validator";
import { recollectErrors } from "../middelwares/recollectErrors";
import { getByID } from "../controllers/order";

const router = Router();

router.post('/', [
    validateJWT,
    isAdmin,
    check("titulo", "El título es obligatorio").not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").not().isEmpty(),
    check("prioridad", "La prioridad es obligatoria").not().isEmpty(),
    recollectErrors
    ], newIssue); //requiere token (de admin) en el header

router.get('/', [
    validateJWT,
    isAdmin,
    recollectErrors
    ], getAllIssues); //requiere token (de admin) en el header

router.get('/get-pending-issues/', [
    validateJWT,
    isAdmin,
    recollectErrors
    ], getPendingIssues); //requiere token (de admin) en el header

router.get('/get-resolved-issues/', [
    validateJWT,
    isAdmin,
    recollectErrors
    ], getResolvedIssues); //requiere token (de admin) en el header

router.get('/get-pending-issues-by-priority/:priority', [
    validateJWT,
    isAdmin,
    recollectErrors
    ], getIssuesByPriority); //requiere token (de admin) en el header

router.get('/get-issue-by-id/:id', [
    validateJWT,
    isAdmin,
    recollectErrors
    ], getIssueByID); //requiere token (de admin) en el header

router.patch('/solve-issue-by-id/:id', [
    validateJWT,
    isAdmin,
    recollectErrors
    ], solveIssueByID); //requiere token (de admin) en el header

router.delete('/hard-delete-issue-by-id/:id', [
    validateJWT,
    isAdmin,
    recollectErrors
    ], deleteIssueByID); //requiere token (de admin) en el header

export default router;//