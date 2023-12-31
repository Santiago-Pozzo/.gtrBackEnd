import { Model, Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    nombre: string,
    apellido: string,
    email: string,
    estado: boolean
}

const UserSchema = new Schema<IUser>({

    nombre: {
        type: String,
        required: true
    },

    apellido: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    estado: {
        type: Boolean,
        required: true,
        default: true
    }

})

const User:Model<IUser> = model<IUser>("User", UserSchema);

export default User;