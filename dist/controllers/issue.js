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
exports.newIssue = void 0;
const issues_1 = __importDefault(require("../models/issues"));
const newIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descripcion, prioridad } = req.body;
    const user = req.body.confirmedUser._id;
    const issue = new issues_1.default({
        titulo,
        descripcion,
        prioridad,
        usuario: user,
        fecha: new Date()
    });
    try {
        yield issue.save();
        return res.status(201).json({
            msj: "El issue fue creado correctamente",
            issue
        });
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({
            msj: "Error interno del servidor",
            error
        });
    }
});
exports.newIssue = newIssue;
//# sourceMappingURL=issue.js.map