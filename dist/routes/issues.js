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
], issue_1.newIssue);
exports.default = router;
//# sourceMappingURL=issues.js.map