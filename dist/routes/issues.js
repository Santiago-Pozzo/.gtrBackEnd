"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const issue_1 = require("../controllers/issue");
const validateJWT_1 = require("../middelwares/validateJWT");
const isAdmin_1 = require("../middelwares/isAdmin");
const express_validator_1 = require("express-validator");
const recollectErrors_1 = require("../middelwares/recollectErrors");
const router = (0, express_1.Router)();
router.post('/', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    (0, express_validator_1.check)("titulo", "El título es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("descripcion", "La descripción es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("prioridad", "La prioridad es obligatoria").not().isEmpty(),
    recollectErrors_1.recollectErrors
], issue_1.newIssue); //requiere token (de admin) en el header
router.get('/', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], issue_1.getAllIssues); //requiere token (de admin) en el header
router.get('/get-pending-issues/', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], issue_1.getPendingIssues); //requiere token (de admin) en el header
router.get('/get-resolved-issues/', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], issue_1.getResolvedIssues); //requiere token (de admin) en el header
router.get('/get-pending-issues-by-priority/:priority', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], issue_1.getIssuesByPriority); //requiere token (de admin) en el header
router.get('/get-issue-by-id/:id', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], issue_1.getIssueByID); //requiere token (de admin) en el header
router.patch('/solve-issue-by-id/:id', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], issue_1.solveIssueByID); //requiere token (de admin) en el header
router.delete('/hard-delete-issue-by-id/:id', [
    validateJWT_1.validateJWT,
    isAdmin_1.isAdmin,
    recollectErrors_1.recollectErrors
], issue_1.deleteIssueByID); //requiere token (de admin) en el header
exports.default = router; //
//# sourceMappingURL=issues.js.map