"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
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
const Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
//# sourceMappingURL=product.js.map