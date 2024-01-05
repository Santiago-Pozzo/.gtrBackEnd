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
exports.deleteIssueByID = exports.solveIssueByID = exports.getIssueByID = exports.getIssuesByPriority = exports.getResolvedIssues = exports.getPendingIssues = exports.getAllIssues = exports.newIssue = void 0;
const issues_1 = __importDefault(require("../models/issues"));
const mongoose_1 = __importDefault(require("mongoose"));
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
}); //
exports.newIssue = newIssue;
const getAllIssues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const issues = yield issues_1.default.find();
        if (!issues) {
            return res.status(400).json({
                msj: "No hay issues para mostrar"
            });
        }
        ;
        return res.status(200).json({
            msj: "Las issues se encontraron exitosamente",
            issues: [...issues]
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        });
    }
}); //
exports.getAllIssues = getAllIssues;
const getPendingIssues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const condicion = { resuelta: false };
    try {
        const pendingIssues = yield issues_1.default.find(condicion);
        if (!pendingIssues) {
            return res.status(404).json({
                msj: "No hay issues pendientes"
            });
        }
        ;
        return res.status(200).json({
            msj: "Las issues pendientes se encontraron exitosamente",
            issues: [...pendingIssues]
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        });
    }
}); //
exports.getPendingIssues = getPendingIssues;
const getResolvedIssues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const condicion = { resuelta: true };
    try {
        const resolvedIssues = yield issues_1.default.find(condicion);
        if (!resolvedIssues) {
            return res.status(404).json({
                msj: "No hay issues resueltas"
            });
        }
        ;
        return res.status(200).json({
            msj: "Las issues resueltas se encontraron exitosamente",
            issues: [...resolvedIssues]
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        });
    }
}); //
exports.getResolvedIssues = getResolvedIssues;
const getIssuesByPriority = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { priority } = req.params;
    const condicion = { prioridad: priority, resuelta: false };
    try {
        const issues = yield issues_1.default.find(condicion);
        if (!issues || issues.length === 0) {
            return res.status(404).json({
                msj: `No se encontraron issues de prioridad ${priority}`
            });
        }
        ;
        return res.status(200).json({
            msj: `Se encontraron exitosamente ${issues.length} issues pendientes de prioridad ${priority}`,
            issues: [...issues]
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        });
    }
}); //
exports.getIssuesByPriority = getIssuesByPriority;
const getIssueByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msj: "El formato del ID no es válido. Debe ser una cadena de 24 caracteres hexadecimales."
        });
    }
    try {
        const issue = yield issues_1.default.findById(id);
        if (!issue) {
            return res.status(404).json({
                msj: `No se encontraron issues con el _id ${id}`
            });
        }
        ;
        return res.status(200).json({
            msj: `Se encontró exitosamente la issue _id:${id}`,
            issue
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        });
    }
}); //
exports.getIssueByID = getIssueByID;
const solveIssueByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msj: "El formato del ID no es válido. Debe ser una cadena de 24 caracteres hexadecimales."
        });
    }
    const issue = yield issues_1.default.findById(id);
    if (!issue) {
        return res.status(404).json({
            msj: `No se encontraron issues con el _id ${id}`
        });
    }
    ;
    if (issue.resuelta) {
        return res.status(400).json({
            msj: `La issue con el _id ${id} ya se encuentra resuelta`
        });
    }
    ;
    try {
        const issue = yield issues_1.default.findByIdAndUpdate(id, { resuelta: true }, { new: true });
        return res.status(200).json({
            msj: `Se resolvió exitosamente la issue _id:${id}`,
            issue
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        });
    }
}); //
exports.solveIssueByID = solveIssueByID;
const deleteIssueByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msj: "El formato del ID no es válido. Debe ser una cadena de 24 caracteres hexadecimales."
        });
    }
    try {
        const issue = yield issues_1.default.findByIdAndDelete(id);
        if (!issue) {
            return res.status(404).json({
                msj: `No se encontraron issues con el _id ${id}`
            });
        }
        ;
        return res.status(200).json({
            msj: `Se eliminó exitosamente la issue _id:${id}`,
            issue
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        });
    }
}); //
exports.deleteIssueByID = deleteIssueByID;
//# sourceMappingURL=issue.js.map