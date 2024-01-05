"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("./user"));
const IssuesSchema = new mongoose_1.Schema({
    titulo: {
        type: String,
        required: [true, "El título es obligatorio"]
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"]
    },
    prioridad: {
        type: Number,
        required: [true, "La pripridad es obligatoria"]
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_1.default,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    resuelta: {
        type: Boolean,
        default: false
    }
});
const Issue = (0, mongoose_1.model)("Issue", IssuesSchema);
exports.default = Issue;
//# sourceMappingURL=issues.js.map