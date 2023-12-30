import { Model, Schema, model } from "mongoose";

export interface IProduct {
    
    id_producto: number,
    categoria: string,
    marca: string,
    logo_marca: string,
    modelo: string,
    descripcion: string,
    imagen_url: string,
    precio: number,
    estado: boolean

}

const ProductSchema = new Schema<IProduct>({
    id_producto: {
        type: Number,
        unique: true,
        required: true
    },

    categoria: String,

    marca: {
        type: String,
        required: true,
    },

    logo_marca: String,

    modelo: {
        type: String,
        required: true,
    },

    descripcion: String,

    imagen_url: String,

    precio: {
        type: Number,
        required: true,
    },

    estado: {
        type: Boolean,
        default: true, 
    }

});

const Product:Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;

