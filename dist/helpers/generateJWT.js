"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id = "") => {
    return new Promise((res, rej) => {
        const payload = { id };
        jsonwebtoken_1.default.sign(payload, process.env.TOKEN_KEY, {
            expiresIn: "4h"
        }, (err, token) => {
            if (err) {
                console.error(err);
                rej("No se pudo generar el token");
            }
            else {
                res(token);
            }
        });
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=generateJWT.js.map