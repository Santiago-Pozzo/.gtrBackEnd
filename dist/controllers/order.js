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
exports.hardDeleteOrder = exports.restoreOrder = exports.softDeleteOrder = exports.getUserOrdersByID = exports.getUserOrdersByEmail = exports.getByID = exports.getOrderByID = exports.getAllOrders = exports.newOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_1 = __importDefault(require("../models/order"));
const user_1 = __importDefault(require("../models/user"));
const newOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    const order = new order_1.default(orderData);
    yield order.save();
    res.json({
        msj: "Orden creada corectamente",
        order
    });
});
exports.newOrder = newOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const condicion = { estado: true };
    const orders = yield order_1.default.find(condicion);
    res.json({
        orders
    });
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
    const order = yield order_1.default.findById(orderID);
    if (!order) {
        res.json({
            msj: "No se encontró la orden de compra"
        });
        return;
    }
    ;
    res.json({
        order
    });
});
exports.getOrderByID = getOrderByID;
//Función auxiliar para buscar ordenes con el Id de usuario. Devuelve las ordenes del usuario o null
const getByID = (userID) => __awaiter(void 0, void 0, void 0, function* () { return yield order_1.default.find({ usuario: userID }); });
exports.getByID = getByID;
const getUserOrdersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.params;
    // Verificar si el email cumple con el formato requerido
    const isValidEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(userEmail);
    if (!isValidEmail) {
        return res.status(400).json({
            msj: "El formato del correo electrónico no es válido."
        });
    }
    const user = yield user_1.default.findOne({ email: userEmail });
    if (!user) {
        res.json({
            msj: "No hay usuarios registrados con ese email"
        });
        return;
    }
    ;
    const orders = yield (0, exports.getByID)(user._id);
    if (!orders) {
        res.json({
            msj: "El usuario no tiene compras realizadas"
        });
        return;
    }
    res.json({
        msj: "Ordenes de compras encontradas",
        orders
    });
});
exports.getUserOrdersByEmail = getUserOrdersByEmail;
const getUserOrdersByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    try {
        const user = yield user_1.default.findOne({ _id: userID });
        if (!user) {
            return res.json({
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
            msj: "Error interno del servidor"
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
    const order = yield order_1.default.findOneAndUpdate({ _id: orderID }, { estado: false });
    if (!order) {
        res.json({
            msj: "No se encontró la orden"
        });
        return;
    }
    res.json({
        msj: "La orden se eliminó correctamente",
        order
    });
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
    const order = yield order_1.default.findOneAndUpdate({ _id: orderID }, { estado: true });
    if (!order) {
        res.json({
            msj: "No se encontró la orden"
        });
        return;
    }
    res.json({
        msj: "La orden se reestableció correctamente",
        order
    });
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
    const order = yield order_1.default.findByIdAndDelete(orderID);
    if (!order) {
        res.json({
            msj: "No se encontró la orden"
        });
        return;
    }
    res.json({
        msj: "La orden se eliminó correctamente",
        order
    });
});
exports.hardDeleteOrder = hardDeleteOrder;
//# sourceMappingURL=order.js.map