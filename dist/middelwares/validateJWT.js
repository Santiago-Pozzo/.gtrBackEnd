"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["token"]; //recibo el token del header de la rquest y lo convierto a string
    if (!token) {
        res.status(401).json({
            msj: "Falta el token en el header de la petición"
        });
        return;
    }
    try {
        const key = process.env.TOKEN_KEY;
        const payload = jsonwebtoken_1.default.verify(token, key);
        const { id } = payload;
        const confirmedUser = yield user_1.default.findById(id);
        if (!confirmedUser) {
            res.status(401).json({
                msj: "El token no es válido"
            });
            return;
        }
        req.body.id = id; //Con esta instrucción creo, en el body, una clave id con el valor de id que extraje del token
        req.body.confirmedUser = confirmedUser; //Creo en el body una clave usuarioCOnfirmado con los datos de confirmedUser 
        //EL próximo middelware va a poder acceder al body    
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msj: "Error del servidor al generar el token"
        });
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validateJWT.js.map