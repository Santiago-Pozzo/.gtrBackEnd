import { Model, Schema, model, Document } from "mongoose";
import { ROLES } from "../helpers/contants";

export interface IUser extends Document {
    nombre: string,
    apellido: string,
    email: string,
    contraseña: string,
    rol?: string, //El signo ? significa que el campo es opcional
    codigo?: string, //Lo vamos a utilizar para verificar el usuario via mail
    verificado?: boolean,
    estado: boolean
}

const UserSchema = new Schema<IUser>({

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
        default: ROLES.user
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

})

UserSchema.methods.toJSON = function() { //Esta función es para que, cuando se realicen peticiones de usuarios a la API, esta no envíe los campos __v, contraseña y código
    const { __v, contraseña, codigo, ...usuario } = this.toObject();
    return usuario
}

const User:Model<IUser> = model<IUser>("User", UserSchema);

export default User;
