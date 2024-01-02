import express, { Express } from "express";
import cors from "cors";

import { connectDB } from "../database/config";
import usersRoutes from "../routes/users";//como yo exporté por default el router en users.ts, aca lo puedo traer con un nombre diferente (en el archivo user.ts se exportó como rutes, acá lo traigo con el alias usersRoutes)
import productRoutes from "../routes/products";
import orderRoutes from "../routes/orders";
import authRoutes from "../routes/auths";


export class Server {

    app: Express;
    port: string | number |undefined;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.conectionDB();
        this.middlewares();
        this.routes();
    }

    listen(): void {
        this.app.listen(this.port, ()=>{
            console.log(`Corriendo en el puerto ${this.port}`);            
        })
    }

    async conectionDB(): Promise<void>{
        await connectDB();
    }

    middlewares(): void {
        this.app.use(cors());//Esta libreria permite y gestiona solicitudes que vengan de ina url distinta a la que esta instancia nuestra API
        this.app.use(express.json());//Este metodo hace que este disponible el body en las .body
    }

    routes(): void {
        this.app.use('/users', usersRoutes);//Con esta instrucción cuando se acceda a el path /users se podra acceder a los metodos (solicitudes HTTP en este caso) definidos en ../routes/users.ts
        this.app.use('/products', productRoutes);
        this.app.use('/orders', orderRoutes);
        this.app.use('/auth', authRoutes);
    }
}