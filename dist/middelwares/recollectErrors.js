"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recollectErrors = void 0;
const express_validator_1 = require("express-validator");
const recollectErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req); //Recibe todos los errores de los checks que están antes que este middelware en donde se lo llama 
    if (!errors.isEmpty()) {
        res.status(400).json({
            msj: "Hubo errores al realizar la petición",
            errors
        });
    }
    else {
        next();
    }
};
exports.recollectErrors = recollectErrors;
//# sourceMappingURL=recollectErrors.js.map