import { Model, Schema, Types, model } from "mongoose";

import { IUser } from "./user";
import { IProduct } from "./product";


export interface IOrderItem  {
    producto: Types.ObjectId | IProduct,   
    precioAlComprar: number,
    cantidad: number
};

export interface IOrder {
    fecha: Date,
    usuario: Types.ObjectId | IUser,    
    items: IOrder[],
    precioTotalAlComprar: number,
    estado: boolean,
};

export const OrderSchema = new Schema<IOrder>({

    fecha: {
        type: Date,
        default: Date.now
    },

    usuario: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            producto: {
                type: Types.ObjectId,
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