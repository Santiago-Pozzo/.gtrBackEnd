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
    const products = yield product_1.default.find(condicion);
    res.json({
        products
    });
});
exports.getProducts = getProducts;
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body; //obtengo los datos enviados a traves del body de la request (que tienen que coincidir con lo establecido en IUser)
    const isExitingProduct = yield product_1.default.findOne({ id_producto: productData.id_producto }); //Verifico que el id ingresado en el body no exita en la base de datos
    if (isExitingProduct) {
        res.json({
            msj: "El id_producto ingresado ya existe. Puede consultar los productos de la base de datos para elegir otro id",
        });
        return;
    }
    const product = new product_1.default(productData); // creo un usuario con el modelo de mongoose y los datos que vienen en el body de la req
    yield product.save();
    res.json({
        msj: "Producto creado corectamente",
        product
    });
});
exports.newProduct = newProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("jsfdhjfsdhjfdsjdsfjjdfsjjd");
    const { id_producto } = req.params;
    const product = yield product_1.default.findOne({ id_producto: id_producto });
    if (!product) {
        res.json({
            msj: "Producto no encontrado"
        });
        return;
    }
    const { _id } = product;
    const _a = req.body, { estado } = _a, data = __rest(_a, ["estado"]);
    const updatedProduct = yield product_1.default.findByIdAndUpdate(_id, data); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a podificar.
    res.json({
        msj: "Los datos del producto han sido actualizados",
        updatedProduct
    });
});
exports.updateProduct = updateProduct;
const getProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    const product = yield product_1.default.findOne({ id_producto: id_producto });
    if (!product) {
        res.json({
            msj: "No se encontró ningún producto"
        });
        return;
    }
    res.json({
        product
    });
});
exports.getProductByID = getProductByID;
const hardDeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    const product = yield product_1.default.findOneAndDelete({ id_producto: id_producto });
    if (!product) {
        res.json({
            msj: "No se encontró el producto"
        });
        return;
    }
    res.json({
        product
    });
});
exports.hardDeleteProduct = hardDeleteProduct;
const softDeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    const product = yield product_1.default.findOneAndUpdate({ id_producto: id_producto }, { estado: false }, { new: true });
    if (!product) {
        res.json({
            msj: "Producto no encontrado"
        });
        return;
    }
    res.json({
        msj: "Se eliminó el producto",
        product
    });
});
exports.softDeleteProduct = softDeleteProduct;
const restoreProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    const product = yield product_1.default.findOneAndUpdate({ id_producto: id_producto }, { estado: true }, { new: true });
    if (!product) {
        res.json({
            msj: "Producto no encontrado"
        });
        return;
    }
    res.json({
        msj: "Se reestableció el producto",
        product
    });
});
exports.restoreProduct = restoreProduct;
//# sourceMappingURL=product.js.map