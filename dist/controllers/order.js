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
exports.hardDeleteOrder = exports.restoreOrder = exports.softDeleteOrder = exports.getUserOrdersByID = exports.getUserOrdersByEmail = exports.getByID = exports.getOrderByID = exports.getAllOrders = exports.getUserOrders = exports.newOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_1 = __importDefault(require("../models/order"));
const user_1 = __importDefault(require("../models/user"));
const product_1 = __importDefault(require("../models/product"));
const functions_1 = require("../helpers/functions");
// Función auxiliar que realiza la transformación de id_producto a _id
const transformArray = (productosArray) => __awaiter(void 0, void 0, void 0, function* () {
    // Utiliza Promise.all para esperar que todas las consultas findOne se completen
    const items = yield Promise.all(productosArray.map((producto) => __awaiter(void 0, void 0, void 0, function* () {
        // Realiza la consulta findOne para obtener el _id correspondiente al id_producto
        const productoEnDB = yield product_1.default.findOne({ id_producto: producto.id_producto });
        if (productoEnDB) {
            return {
                producto: productoEnDB,
                precioAlComprar: producto.precioAlComprar,
                cantidad: producto.cantidad,
            };
        }
        else {
            return {
                msj: `Producto con id_producto ${producto.id_producto} no encontrado.`
            };
        }
    })));
    return items;
});
const newOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confirmedUser = req.body.confirmedUser._id;
    const { arrayProductos, precioTotalAlComprar } = req.body; //faltan verificar los datos recibidos
    const items = yield transformArray(arrayProductos);
    if (items.some(item => !item.producto)) { //Busco entre los items aquellos que no tengan un campo producto (los que no se encontraron son un objeto con un msj)
        res.status(404).json({
            msj: "Algunos productos no se encontraron",
            items
        });
        return;
    }
    ;
    const order = yield new order_1.default({
        usuario: confirmedUser,
        items: items,
        precioTotalAlComprar
    }).populate("usuario");
    try {
        yield order.save();
        return res.status(201).json({
            msj: "Orden creada corectamente",
            order
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor al guardar la orden",
            error: error
        });
    }
}); //
exports.newOrder = newOrder;
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.confirmedUser._id;
    const consulta = { usuario: userID };
    try {
        const orders = yield order_1.default.find(consulta);
        if (!orders) {
            return res.status(401).json({
                msj: "No se encontraron órdenes de compra"
            });
        }
        return res.json({
            msj: `Las órdenes del usuario ${req.body.confirmedUser.email} se encontraron correctamente`,
            data: [...orders]
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
exports.getUserOrders = getUserOrders;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const condicion = { estado: true };
    try {
        const orders = yield order_1.default.find(condicion);
        return res.json({
            orders
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });
    }
});
exports.getAllOrders = getAllOrders;
const getOrderByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderID } = req.params;
    // Verificar si el orderID cumple con el formato requerido
    if (!mongoose_1.default.Types.ObjectId.isValid(orderID)) {
        return res.status(400).json({
            msj: "El formato del ID de orden no es válido. Debe ser una cadena de 24 caracteres hexadecimales."
        });
    }
    try {
        const order = yield order_1.default.findById(orderID);
        if (!order) {
            return res.status(404).json({
                msj: "No se encontró la orden de compra"
            });
        }
        ;
        return res.json({
            order
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });
    }
});
exports.getOrderByID = getOrderByID;
//Función auxiliar para buscar ordenes con el Id de usuario. Devuelve las ordenes del usuario o null (no verifica el formato de la ID)
const getByID = (userID) => __awaiter(void 0, void 0, void 0, function* () { return yield order_1.default.find({ usuario: userID }); });
exports.getByID = getByID;
const getUserOrdersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.params;
    // Verificar si el email cumple con el formato requerido
    if ((0, functions_1.isValidEmail)(userEmail)) {
        return res.status(400).json({
            msj: "El formato del correo electrónico no es válido."
        });
    }
    try {
        const user = yield user_1.default.findOne({ email: userEmail });
        if (!user) {
            return res.json({
                msj: "No hay usuarios registrados con ese email"
            });
        }
        ;
        const orders = yield (0, exports.getByID)(user._id);
        if (!orders) {
            return res.json({
                msj: "El usuario no tiene compras realizadas"
            });
        }
        return res.json({
            msj: "Ordenes de compras encontradas",
            orders
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });
    }
});
exports.getUserOrdersByEmail = getUserOrdersByEmail;
const getUserOrdersByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    // Verificar si el orderID cumple con el formato requerido
    if (!mongoose_1.default.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({
            msj: "El formato del ID de orden no es válido. Debe ser una cadena de 24 caracteres hexadecimales."
        });
    }
    try {
        const user = yield user_1.default.findOne({ _id: userID });
        if (!user) {
            return res.status(404).json({
                msj: "No se encontró el usuario"
            });
        }
        const orders = yield (0, exports.getByID)(user._id);
        if (!orders) {
            return res.json({
                msj: "El usuario no tiene compras realizadas"
            });
        }
        return res.json({
            msj: "Ordenes de compras encontradas",
            orders
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });
    }
});
exports.getUserOrdersByID = getUserOrdersByID;
const softDeleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderID } = req.params;
    // Verificar si el orderID cumple con el formato requerido
    if (!mongoose_1.default.Types.ObjectId.isValid(orderID)) {
        return res.status(400).json({
            msj: "El formato del ID de orden no es válido. Debe ser una cadena hexadecimal de 24 caracteres"
        });
    }
    try {
        const order = yield order_1.default.findOneAndUpdate({ _id: orderID }, { estado: false }, { new: true });
        if (!order) {
            return res.status(404).json({
                msj: "No se encontró la orden"
            });
            return;
        }
        return res.json({
            msj: "La orden se eliminó correctamente",
            order
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });
    }
});
exports.softDeleteOrder = softDeleteOrder;
const restoreOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderID } = req.params;
    // Verificar si el orderID cumple con el formato requerido
    if (!mongoose_1.default.Types.ObjectId.isValid(orderID)) {
        return res.status(400).json({
            msj: "El formato del ID de orden no es válido. Debe ser una cadena hexadecimal de 24 caracteres"
        });
    }
    try {
        const order = yield order_1.default.findOneAndUpdate({ _id: orderID }, { estado: true }, { new: true });
        if (!order) {
            return res.status(404).json({
                msj: "No se encontró la orden"
            });
        }
        return res.json({
            msj: "La orden se reestableció correctamente",
            order
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });
    }
});
exports.restoreOrder = restoreOrder;
const hardDeleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderID } = req.params;
    // Verificar si el orderID cumple con el formato requerido
    if (!mongoose_1.default.Types.ObjectId.isValid(orderID)) {
        return res.status(400).json({
            msj: "El formato del ID de orden no es válido. Debe ser una cadena hexadecimal de 24 caracteres"
        });
    }
    try {
        const order = yield order_1.default.findByIdAndDelete(orderID);
        if (!order) {
            return res.json({
                msj: "No se encontró la orden"
            });
        }
        return res.json({
            msj: "La orden se eliminó correctamente",
            order
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });
    }
});
exports.hardDeleteOrder = hardDeleteOrder;
//# sourceMappingURL=order.js.map