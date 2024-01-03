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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
const users_1 = __importDefault(require("../routes/users")); //como yo exporté por default el router en users.ts, aca lo puedo traer con un nombre diferente (en el archivo user.ts se exportó como rutes, acá lo traigo con el alias usersRoutes)
const products_1 = __importDefault(require("../routes/products"));
const orders_1 = __importDefault(require("../routes/orders"));
const auths_1 = __importDefault(require("../routes/auths"));
const issues_1 = __importDefault(require("../routes/issues"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.conectionDB();
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto ${this.port}`);
        });
    }
    conectionDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.connectDB)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)()); //Esta libreria permite y gestiona solicitudes que vengan de ina url distinta a la que esta instancia nuestra API
        this.app.use(express_1.default.json()); //Este metodo hace que este disponible el body en las .body
    }
    routes() {
        this.app.use('/users', users_1.default); //Con esta instrucción cuando se acceda a el path /users se podra acceder a los metodos (solicitudes HTTP en este caso) definidos en ../routes/users.ts
        this.app.use('/products', products_1.default);
        this.app.use('/orders', orders_1.default);
        this.app.use('/auth', auths_1.default);
        this.app.use('/issues', issues_1.default);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map