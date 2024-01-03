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
exports.verifyUser = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const randomstring_1 = __importDefault(require("randomstring"));
const constants_1 = require("../helpers/constants");
const mailer_1 = require("../mailer/mailer");
const generateJWT_1 = require("../helpers/generateJWT");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, email, contraseña, rol } = req.body;
    //La validación de datos ya se realizó con los checks en la ruta (routes/auths.ts)
    try {
        //Encriptado de la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        const encryptedPass = bcryptjs_1.default.hashSync(contraseña, salt);
        //Usuario administrador
        const adminKey = req.headers["admin-key"]; //Accedo a los headers de la requuest y busco la clave admin-
        let userRol = constants_1.ROLES.user;
        if (adminKey === process.env.ADMIN_KEY) {
            userRol = constants_1.ROLES.admin;
        }
        ;
        //Genero un código aleatorio de 6 caracteres
        const randomCode = randomstring_1.default.generate(6);
        const user = new user_1.default({
            nombre,
            apellido,
            email,
            contraseña: encryptedPass,
            rol: userRol,
            codigo: randomCode
        });
        yield user.save();
        yield (0, mailer_1.sendMail)(email, randomCode);
        return res.status(201).json({
            msj: "Usuario registrado correctamente",
            user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error en el servidor",
            error
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contraseña } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msj: "No se encontró el email en la base de datos"
            });
        }
        ;
        const validatePassword = bcryptjs_1.default.compareSync(contraseña, user.contraseña);
        if (!validatePassword) {
            return res.status(400).json({
                msj: "La contraseña es incorrecta"
            });
        }
        ;
        const token = yield (0, generateJWT_1.generateJWT)(user.id);
        return res.status(200).json({
            msj: "Inicio de sesión exitoso",
            user,
            token
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error en el servidor",
            error
        });
    }
});
exports.login = login;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, codigo } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msj: "No se encontró el email en la base de datos"
            });
        }
        ;
        if (user.verificado) {
            return res.status(400).json({
                msj: "El usuario ya se encuentra verificado"
            });
        }
        ;
        if (codigo !== user.codigo) {
            return res.status(400).json({
                msj: "El código es incorrecto"
            });
        }
        ;
        const actualizedUser = yield user_1.default.findOneAndUpdate({ email }, { verificado: true }, { new: true });
        return res.status(200).json({
            msj: "Usuario verificado exitosamente",
            actualizedUser
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error en el servidor",
            error
        });
    }
});
exports.verifyUser = verifyUser;
//# sourceMappingURL=auth.js.map