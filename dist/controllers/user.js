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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreUser = exports.softDeleteUser = exports.hardDeleteUser = exports.updateUser = exports.newUser = exports.getUserByEmail = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const condicion = { estado: true };
    const users = yield user_1.default.find(condicion);
    res.json({
        users
    });
});
exports.getUsers = getUsers;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params; //Desestructuro el email de los parametros de la Request
    const user = yield user_1.default.findOne({ email: email }); //La constante user puede ser de la clase IUser o puede ser null. En el metodo findOne establezco como condición que el campo email sea igual al valor de email que desestructuramos de la req
    res.json({
        user
    });
});
exports.getUserByEmail = getUserByEmail;
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body; //obtengo los datos enviados a traves del body de la request
    const user = new user_1.default(userData); // creo un usuario con el modelo de mongoose y los datos que vienen en el body de la req
    yield user.save();
    res.json({
        msj: "Usuario creado corectamente",
        user
    });
});
exports.newUser = newUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params; //Desestructuro el email de los parametros de la 
    const user = yield user_1.default.findOne({ email: email }); //Primero busco al usuario con el email y devuelvo un mensaje si no lo encontró
    if (!user) {
        res.json({
            message: "Usuario no encontrado"
        });
        return;
    }
    const { _id } = user; //Si el usuario existe desestructuro su id para buscarlo y actualizar los datos necesarios (excepto el estado)
    const _a = req.body, { estado } = _a, data = __rest(_a, ["estado"]); //Desestructuro del body del request: el estado y el resto de los campos con el spread operator en data 
    console.log(data);
    const updatedUser = yield user_1.default.findByIdAndUpdate(_id, data); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a podificar.
    res.json({
        updatedUser
    });
});
exports.updateUser = updateUser;
const hardDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const user = yield user_1.default.findOneAndDelete({ email: email }); //Por mas que borre el usuario de la DB, cuando encuentra el usuario igualmente crea la const user con la info del usuario, por eso podemos usar el falsie en el if que sigue más abajo)
    if (!user) { //Si no hay usuario con ese mail envío un menasje de error 
        res.json({
            msj: "No hay un usuario registrado con ese email"
        });
        return;
    }
    res.json({
        user
    });
});
exports.hardDeleteUser = hardDeleteUser;
const softDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params; //Desestructuro el email de los parametros de la Request
    const user = yield user_1.default.findOneAndUpdate({ email: email }, { estado: false }); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a podificar.
    if (!user) {
        res.json({
            message: "Usuario no encontrado"
        });
        return;
    }
    res.json({
        user
    });
});
exports.softDeleteUser = softDeleteUser;
const restoreUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const user = yield user_1.default.findOneAndUpdate({ email: email }, { estado: true });
    if (!user) {
        res.json({
            message: "Usuario no encontrado"
        });
        return;
    }
    res.json({
        user
    });
});
exports.restoreUser = restoreUser;
//# sourceMappingURL=user.js.map