import { Model, Schema, Types, model, ObjectId } from "mongoose";

import { IUser } from "./user";
import { IProduct } from "./product";


export interface IOrderItem  {
    producto: ObjectId | IProduct,   // producto puede ser del tipo ObjetId o puede ser un objeto de la clase IProduct
    precioAlComprar: number,
    cantidad: number
};

export interface IOrder {
    fecha: Date,
    usuario: ObjectId | IUser,    
    items: IOrderItem[],
    precioTotalAlComprar: number,
    estado: boolean,
};

export const OrderSchema = new Schema<IOrder>({

    fecha: {
        type: Date,
        default: Date.now
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User", //Con esto hago referencia que usuario va a ser un documento de la colección Users (construida con el modelo User que es lo que aclaramos en esta línea entre comillas)
        required: true
    },

    items: [
        {
            producto: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            precioAlComprar: {
                type: Number,
                required: true
            },

            cantidad: {
                type: Number,
                required: true
            },

        }
    ],

    precioTotalAlComprar: {
        type: Number,
        required: true
    },

    estado: {
        type: Boolean,
        required: true,
        default: true
    }
})


const Order:Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;