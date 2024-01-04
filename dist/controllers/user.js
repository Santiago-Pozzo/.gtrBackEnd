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
exports.restorePassword = exports.restoreUser = exports.softDeleteUser = exports.hardDeleteUser = exports.updateUserPass = exports.updateUserEmail = exports.updateUserLastName = exports.updateUserName = exports.getUserByEmail = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const randomstring_1 = __importDefault(require("randomstring"));
const user_1 = __importDefault(require("../models/user"));
const functions_1 = require("../helpers/functions");
const mailer_1 = require("../mailer/mailer");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const condicion = { estado: true };
    try {
        const users = yield user_1.default.find(condicion);
        res.json({
            users: [...users]
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error en el servidor al buscar los usuarios"
        });
    }
}); //
exports.getUsers = getUsers;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params; //Desestructuro el email de los parametros de la Request
    if (!(0, functions_1.isValidEmail)(email)) {
        return res.status(400).json({
            msj: "El email no es válido"
        });
    }
    try {
        const user = yield user_1.default.findOne({ email: email }); //La constante user puede ser de la clase IUser o puede ser null. En el metodo findOne establezco como condición que el campo email sea igual al valor de email que desestructuramos de la req
        if (!user) {
            return res.status(401).json({
                msj: `No encontró usuario registrado con el mail ${email}`
            });
        }
        return res.status(200).json({
            msj: `Se encontró el usuario registrado con el mail ${email}`,
            user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error en el servidor"
        });
    }
}); //
exports.getUserByEmail = getUserByEmail;
const updateUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, nombre } = req.body;
    try {
        const updatedUser = yield user_1.default.findByIdAndUpdate(id, { nombre: nombre }, { new: true }); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a modificar.
        return res.status(200).json({
            msj: "Los datos se modificaron correctamente",
            updatedUser
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error al modificar los datos del usuario"
        });
    }
}); //
exports.updateUserName = updateUserName;
const updateUserLastName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, apellido } = req.body;
    try {
        const updatedUser = yield user_1.default.findByIdAndUpdate(id, { apellido: apellido }, { new: true }); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a modificar.
        return res.status(200).json({
            msj: "Los datos se modificaron correctamente",
            updatedUser
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error al modificar los datos del usuario"
        });
    }
}); //
exports.updateUserLastName = updateUserLastName;
const updateUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email } = req.body;
    const randomCode = randomstring_1.default.generate(6);
    try {
        const updatedUser = yield user_1.default.findByIdAndUpdate(id, {
            email: email,
            verificado: false,
            codigo: randomCode
        }, { new: true });
        return res.status(200).json({
            msj: `El email se modificó correctamente. Se envió un nuevo código de verificación al correo ${email}`,
            updatedUser
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servido. No se pudo modificar los datos del usuario"
        });
    }
}); //
exports.updateUserEmail = updateUserEmail;
const updateUserPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, contraseña } = req.body;
    const salt = bcryptjs_1.default.genSaltSync();
    const encryptedPass = bcryptjs_1.default.hashSync(contraseña, salt);
    try {
        const updatedUser = yield user_1.default.findByIdAndUpdate(id, { contraseña: encryptedPass }, { new: true });
        return res.status(200).json({
            msj: `La contraseña se modificó correctamente.`,
            updatedUser
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servido. No se pudo modificar los datos del usuario"
        });
    }
}); //
exports.updateUserPass = updateUserPass;
const hardDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!(0, functions_1.isValidEmail)(email)) {
        return res.status(400).json({
            msj: "El email no es válido"
        });
    }
    if (email === req.body.confirmedUser.email) {
        return res.status(400).json({
            msj: "No es posible realizar un hard delete de un usuario con su propio token."
        });
    }
    try {
        const user = yield user_1.default.findOneAndDelete({ email: email }); //Por mas que borre el usuario de la DB, cuando encuentra el usuario igualmente crea la const user con la info del usuario  (porque no agregue el argumento {new: true en el findoneAndDelete})   , por eso podemos usar el falsie en el if que sigue más abajo)
        if (!user) {
            return res.status(401).json({
                msj: `No encontró usuario registrado con el mail ${email}`
            });
        }
        return res.status(200).json({
            msj: `Se eliminó de la base de datos el usuario registrado con el mail ${email}`,
            user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error del servidor al intentar eliminar definitivamente un usuario"
        });
    }
}); //
exports.hardDeleteUser = hardDeleteUser;
const softDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    try {
        const user = yield user_1.default.findByIdAndUpdate(id, { estado: false, verificado: false }, { new: true });
        return res.status(200).json({
            msj: `Se elimino correctamente el usuario registrado con el mail ${req.body.confirmedUser.email}`,
            user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pudo eliminar el usuario"
        });
    }
}); //
exports.softDeleteUser = softDeleteUser;
const restoreUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contraseña } = req.body;
    try {
        const userToRestore = yield user_1.default.findOne({ email });
        if (!userToRestore) {
            return res.status(400).json({
                msj: `No se encontró el email ${email} en la base de datos`
            });
        }
        ;
        const validatePassword = bcryptjs_1.default.compareSync(contraseña, userToRestore.contraseña);
        if (!validatePassword) {
            return res.status(400).json({
                msj: "La contraseña es incorrecta"
            });
        }
        ;
        const randomCode = randomstring_1.default.generate(6);
        const user = yield user_1.default.findOneAndUpdate({ email: email }, {
            estado: true,
            verificado: false,
            codigo: randomCode
        }, { new: true });
        yield (0, mailer_1.sendMail)(email, randomCode);
        return res.status(200).json({
            msj: `Usuario reestablecido correctamente. Sen envió el nuevo código de verificación al correo ${email}`,
            user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({
            msj: "Error interno del servido. No se pudo reestablecer el usuario"
        });
    }
}); //
exports.restoreUser = restoreUser;
const restorePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({
            msj: `No se encontraron usuarios registrados con el el email ${email}`
        });
    }
    if (!user.verificado) {
        yield (0, mailer_1.sendMail)(email, user.codigo);
        return res.status(400).json({
            msj: `No se puede reestablecer la contraseña. El correo ${email} está registrado pero no fue verificado. Se reenvió el código por email para que pueda conpletar la verificación`
        });
    }
    const randomPass = randomstring_1.default.generate(8);
    const salt = bcryptjs_1.default.genSaltSync();
    const encryptedPass = bcryptjs_1.default.hashSync(randomPass, salt);
    try {
        yield (0, mailer_1.sendNewPass)(email, randomPass);
        const updatedUser = yield user_1.default.findOneAndUpdate({ email }, { contraseña: encryptedPass }, { new: true });
        return res.status(400).json({
            msj: `Se envió la contraseña de recuperación al correo ${email}`
        });
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({
            msj: "Error interno del servido. No se pudo reestablecer la contraseña"
        });
    }
}); //
exports.restorePassword = restorePassword;
//# sourceMappingURL=user.js.map