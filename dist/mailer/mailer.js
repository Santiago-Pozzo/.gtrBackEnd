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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
//Configuramos el transporte de nodemailer para usar Gmail
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "spozzo.desarrolloweb@gmail.com",
        pass: "xufjfjnuhtdxdmle"
    },
    from: "spozzo.desarrolloweb@gmail.com"
});
const sendMail = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: "",
            to, //La clave to tiene como valor lo que pasamos en el primer parametro 
            subjetc: "Código de verificación para tu cuenta en .GTR",
            text: `
                Tu código de verificación para .GTR es: ${code}
            `
            //Agregar link para entrar a ingresar el código
        };
        yield transporter.sendMail(mailOptions);
        console.log("El correo se envió correctamente");
    }
    catch (_a) {
        console.error("Error al enviar el correo electrónico");
    }
});
exports.sendMail = sendMail;
//# sourceMappingURL=mailer.js.map