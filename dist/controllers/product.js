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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreProduct = exports.softDeleteProduct = exports.hardDeleteProduct = exports.getProductByID = exports.updateProduct = exports.newProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const condicion = { estado: true };
    try {
        const products = yield product_1.default.find(condicion);
        return res.status(200).json({
            msj: "Producto encontrados exitosamente",
            productos: [...products]
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor.",
            error
        });
    }
}); //
exports.getProducts = getProducts;
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    const isExitingProduct = yield product_1.default.findOne({ id_producto: productData.id_producto }); //Verifico que el id ingresado en el body no exita en la base de datos
    if (isExitingProduct) {
        return res.status(400).json({
            msj: `El id_producto ${productData.id_producto} ya existe. Puede consultar los productos de la base de datos para elegir otro id`,
        });
    }
    try {
        const product = new product_1.default(productData);
        yield product.save();
        return res.status(201).json({
            msj: "Producto creado corectamente",
            product
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pudo agregar el producto a la base de datos",
            error
        });
    }
}); //
exports.newProduct = newProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    const product = yield product_1.default.findOne({ id_producto: id_producto });
    if (!product) {
        return res.status(404).json({
            msj: `No se encontró el producto con id_producto: ${id_producto}`
        });
    }
    ;
    const { _id } = product;
    const _a = req.body, { estado } = _a, newdata = __rest(_a, ["estado"]);
    try {
        const updatedProduct = yield product_1.default.findByIdAndUpdate(_id, newdata, { new: true });
        return res.status(200).json({
            msj: `Los datos del producto con id_producto: ${id_producto} se actualizaron correctamente`,
            updatedProduct
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pudo actualizar la información del producto",
            error
        });
    }
    ;
}); //
exports.updateProduct = updateProduct;
const getProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    try {
        const product = yield product_1.default.findOne({ id_producto: id_producto });
        if (!product) {
            return res.status(404).json({
                msj: `No se encontró ningún producto con id_producto: ${id_producto}`
            });
        }
        return res.status(200).json({
            msj: `Producto con id_producto: ${id_producto}, encontrado exitosamente`,
            product
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor.",
            error
        });
    }
}); //
exports.getProductByID = getProductByID;
const hardDeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("holis");
    const { id_producto } = req.params;
    try {
        const product = yield product_1.default.findOneAndDelete({ id_producto: id_producto });
        if (!product) {
            return res.status(404).json({
                msj: `No se encontró el producto con id_producto: ${id_producto}`
            });
        }
        return res.status(200).json({
            msj: `El producto con id_producto: ${id_producto} se eliminó exitosamente`,
            product
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pudo eliminar el producto",
            error
        });
    }
    ;
}); //
exports.hardDeleteProduct = hardDeleteProduct;
const softDeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    try {
        const product = yield product_1.default.findOneAndUpdate({ id_producto: id_producto }, { estado: false }, { new: true });
        if (!product) {
            return res.status(404).json({
                msj: `No se encontró el producto con id_producto: ${id_producto}`
            });
        }
        res.json({
            msj: `El producto con id_producto: ${id_producto} se eliminó exitosamente`,
            product
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pudo eliminar el producto",
            error
        });
    }
    ;
}); //
exports.softDeleteProduct = softDeleteProduct;
const restoreProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    try {
        const product = yield product_1.default.findOneAndUpdate({ id_producto: id_producto }, { estado: true }, { new: true });
        if (!product) {
            return res.status(404).json({
                msj: `No se encontró el producto con id_producto: ${id_producto}`
            });
        }
        res.json({
            msj: `El producto con id_producto: ${id_producto} se reestableció exitosamente`,
            product
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pudo reestablecer el producto",
            error
        });
    }
    ;
}); //
exports.restoreProduct = restoreProduct;
//# sourceMappingURL=product.js.map