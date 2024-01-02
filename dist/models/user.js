"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contants_1 = require("../helpers/contants");
const UserSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"] //Si no se envía el campo Mongo nos va a entregar un mensaje de error con el string que incluimos en esta sintaxis
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true
    },
    contraseña: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    rol: {
        type: String,
        default: contants_1.ROLES.user
    },
    codigo: {
        type: String,
    },
    verificado: {
        type: Boolean,
        default: false
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
});
UserSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, contraseña, codigo } = _a, usuario = __rest(_a, ["__v", "contrase\u00F1a", "codigo"]);
    return usuario;
};
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map