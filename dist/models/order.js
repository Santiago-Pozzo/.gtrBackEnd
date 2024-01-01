"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
;
;
exports.OrderSchema = new mongoose_1.Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User", //Con esto hago referencia que usuario va a ser un documento de la colección Users (construida con el modelo User que es lo que aclaramos en esta línea entre comillas)
        required: true
    },
    items: [
        {
            producto: {
                type: mongoose_1.Schema.Types.ObjectId,
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
});
const Order = (0, mongoose_1.model)("Order", exports.OrderSchema);
exports.default = Order;
//# sourceMappingURL=order.js.map