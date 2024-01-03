import { Model, Schema, Types, model } from "mongoose";
import User from "./user";

export interface IIssue {
    titulo: string,
    descripcion: string,
    prioridad: number,
    usuario: Types.ObjectId,
    fecha: Date
}

const IssuesSchema = new Schema<IIssue>({
    titulo: {
        type: String,
        required: [ true, "El título es obligatorio"]
    },

    descripcion: {
        type: String,
        required: [ true, "La descripción es obligatoria"]
    },

    prioridad: {
        type: Number,
        required: [ true, "La pripridad es obligatoria"]
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    }, 

    fecha: {
        type: Date,
        default: Date.now
    }
});

const Issue: Model<IIssue> = model<IIssue>("Issue", IssuesSchema);

export default Issue;

