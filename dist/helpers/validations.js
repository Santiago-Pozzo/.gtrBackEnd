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
exports.isRegisteredEmail = void 0;
const user_1 = __importDefault(require("../models/user"));
const mailer_1 = require("../mailer/mailer");
const isRegisteredEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const registeredUser = yield user_1.default.findOne({ email });
    if (registeredUser && registeredUser.verificado) {
        throw new Error(`El email: ${email} ya está registrado y verificado`);
    }
    if (registeredUser && !registeredUser.verificado) {
        yield (0, mailer_1.sendMail)(email, registeredUser.codigo);
        throw new Error(`El email: ${email} ya está registrado. Se envió el nuevamente código de verificación al correo`);
    }
});
exports.isRegisteredEmail = isRegisteredEmail;
//# sourceMappingURL=validations.js.map