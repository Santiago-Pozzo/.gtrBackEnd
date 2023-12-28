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
exports.newUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const condicion = { estado: true };
    const users = yield user_1.default.find(condicion);
    res.json({
        users
    });
});
exports.getUsers = getUsers;
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
//# sourceMappingURL=user.js.map